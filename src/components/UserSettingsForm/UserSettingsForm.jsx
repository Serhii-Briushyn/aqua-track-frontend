import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import css from "./UserSettingsForm.module.css";
import icons from "../../assets/icons/icons.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { updateUser } from "../../redux/auth/operations";

const schema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup.string().email("Email is invalid").required("Email is required!"),
  gender: yup.string().oneOf(["man", "woman"]).required("Gender is required!"),
  weight: yup
    .number()
    .typeError("Please, enter a number")
    .min(0, "Weight must be greater or equal to 0 kg!")
    .max(200, "Weight must be less than 200 kg!")
    .required("Weight is required!"),
  timeSports: yup
    .number()
    .typeError("Please, enter a number")
    .min(0, "Active time must be greater or equal to 0 hours!")
    .max(8, "Active time must be less than 8 hours!")
    .required("Active time is required!"),
  waterRate: yup
    .number("Please, enter a number")
    .typeError("Please, enter a number")
    .min(0, "Daily norma greater or equal to 0 liters!")
    .max(10, "Daily norma must be less than 10 liters!"),
});

const UserSettingsForm = ({ user }) => {
  const [avatarURL, setAvatarURL] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [normaWater, setNormaWater] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchFields = watch(["gender", "weight", "timeSports"]);

  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("weight", user.weight || "");
      setValue("timeSports", user.timeSports || "");
      setValue("gender", user.gender || "woman");
      setValue("waterRate", user.waterRate || 1.8);

      if (user.avatarUrl) {
        setAvatarURL(user.avatarUrl);
      }
    }
  }, [user, setValue]);

  useEffect(() => {
    const [gender, weight, timeSports] = watchFields;
    const waterAmount = calculateWaterNorm(gender, weight, timeSports);
    setNormaWater(waterAmount);
  }, [watchFields]);

  const calculateWaterNorm = (gender, weight, timeSports) => {
    if (gender && weight) {
      let water = 0;
      if (gender === "woman") {
        water = weight * 0.03 + timeSports * 0.4;
      } else if (gender === "man") {
        water = weight * 0.04 + timeSports * 0.6;
      }
      return Math.round(water * 100) / 100;
    }
    return 0;
  };

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log("Submitting data:", data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("weight", data.weight);
    formData.append("timeSports", data.timeSports);
    formData.append("waterRate", data.waterRate || 0);

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      await dispatch(updateUser(formData)).unwrap();
      toast.success("Data successfully updated!");
    } catch (error) {
      // console.error("Update error:", error);
      toast.error(error.message || "Failed to update user data.");
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const avatarURL = URL.createObjectURL(file);
      setAvatarURL(avatarURL);
      setAvatarFile(file);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={css.userSettingsForm}>
        <div className={css.userAvatarContainer}>
          {avatarURL ? (
            <img src={avatarURL} alt="User Avatar" className={css.userAvatar} />
          ) : (
            <FaUserCircle className={css.iconUser} />
          )}
          <button className={css.uploadPhotoBtn}>
            <div className={css.btnIconContainer}>
              <svg width="20" height="20">
                <use href={`${icons}#icon-upload`} />
              </svg>
              <span className={css.inputText}>Upload a photo</span>
            </div>
            <input
              type="file"
              className={css.fileInput}
              id="fileInput"
              name="avatar"
              onChange={handleFileSelect}
            />
          </button>
        </div>
        <div className={css.settingsForm}>
          <fieldset className={css.genderContainer}>
            <legend className={`${css.genderLegend} ${css.inputTitle}`}>
              Your gender identity
            </legend>
            <label className={`${css.genderLabel} ${css.inputText}`}>
              <input
                type="radio"
                className={css.genderInput}
                value="woman"
                name="gender"
                {...register("gender")}
              />
              Woman
            </label>
            <label className={`${css.genderLabel} ${css.inputText}`}>
              <input
                type="radio"
                className={css.genderInput}
                value="man"
                name="gender"
                {...register("gender")}
              />
              Man
            </label>
            {errors.gender && (
              <p className={css.error}>{errors.gender.message}</p>
            )}{" "}
          </fieldset>
          <div className={css.userInfoContainer}>
            <label className={`${css.userInfoLabel} ${css.inputTitle}`}>
              Your name
              <input
                type="text"
                name="name"
                className={`${css.userInfoField} ${css.inputText}`}
                {...register("name")}
              />
              {errors.name && (
                <p className={`${css.error}`}>{errors.name.message}</p>
              )}
            </label>
            <label className={`${css.userInfoLabel} ${css.inputTitle}`}>
              Email
              <input
                type="email"
                name="email"
                className={`${css.userInfoField} ${css.inputText}`}
                {...register("email")}
              />
              {errors.email && (
                <p className={`${css.error}`}>{errors.email.message}</p>
              )}{" "}
            </label>
          </div>
          <div className={css.userInfoContainer}>
            <h3 className={`${css.inputTitle}`}>My daily norma</h3>
            <div className={css.normaWaterContainer}>
              <div>
                <h4 className={`${css.normaGenderTitle} ${css.inputText}`}>
                  For woman:
                </h4>
                <p className={css.greenText}>V=(M*0,03) + (T*0,4)</p>
              </div>
              <div>
                <h4 className={`${css.normaGenderTitle} ${css.inputText}`}>
                  For man:
                </h4>
                <p className={css.greenText}>V=(M*0,04) + (T*0,6)</p>
              </div>
            </div>
            <div className={css.normaWaterTextContainer}>
              <p className={`${css.normaWaterText} ${css.formulaDescription}`}>
                <span className={css.greenText}>*</span> V is the volume of the
                water norm in liters per day, M is your body weight, T is the
                time of active sports, or another type of activity commensurate
                in terms of loads (in the absence of these, you must set 0)
              </p>
            </div>
            <div className={css.activeTimeContainer}>
              <svg width="20" height="21">
                <use href={`${icons}#icon-exclamation-mark`} />
              </svg>
              <p className={css.inputText}>Active time in hours</p>
            </div>
          </div>
          <div className={css.userInfoContainer}>
            <label className={`${css.userInfoLabel} ${css.inputText}`}>
              Your weight in kilograms:
              <input
                type="number"
                name="weight"
                {...register("weight", { min: 0, max: 300 })}
                className={`${css.userInfoField} ${css.inputText} ${
                  errors.weight && css.error
                }`}
              />
              {errors.weight && (
                <p className={`${css.inputText} ${css.error}`}>
                  {errors.weight.message}
                </p>
              )}
            </label>
            <label className={`${css.userInfoLabel} ${css.inputText}`}>
              The time of active participation in sports:
              <input
                type="number"
                name="timeSports"
                {...register("timeSports", { min: 0, max: 8 })}
                className={`${css.userInfoField} ${css.inputText} ${
                  errors.timeSports && css.error
                }`}
              />
              {errors.timeSports && (
                <p className={`${css.inputText} ${css.error}`}>
                  {errors.timeSports.message}
                </p>
              )}
            </label>
          </div>
          <div className={css.userInfoContainer}>
            <div className={css.amountOfWaterContainer}>
              <p
                className={`${css.amountOfWaterText} ${css.inputText} ${css.formulaDescriptionContainer}`}>
                The required amount of water in liters per day:
              </p>
              <span className={css.amountOfWaterText}>{normaWater}L</span>
            </div>
            <label className={`${css.userInfoLabel} ${css.inputTitle}`}>
              Write down how much water you will drink:
              <input
                type="number"
                name="waterRate"
                {...register("waterRate")}
                className={`${css.userInfoField} ${css.inputText}`}
              />
            </label>
          </div>
        </div>
        <button type="submit" className={`${css.saveBtn} ${css.inputTitle}`}>
          Save
        </button>
      </form>
    </>
  );
};

export default UserSettingsForm;
