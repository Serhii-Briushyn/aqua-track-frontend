import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import css from "./UserSettingsForm.module.css";
import icons from "../../assets/icons/icons.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { updateUser } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";

const UserSettingsForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [avatarURL, setAvatarURL] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [normaWater, setNormaWater] = useState(0);
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    name: yup.string().nullable(),
    email: yup.string().email(t("invalidEmail")).nullable(),
    gender: yup
      .string()
      .oneOf(["male", "female"], t("genderRequired"))
      .nullable(),
    weight: yup
      .number()
      .transform((value, originalValue) => (originalValue === "" ? 0 : value))
      .min(0, t("positiveWeight"))
      .max(200, t("weightValueLess"))
      .nullable(),
    activeHours: yup
      .number()
      .transform((value, originalValue) => (originalValue === "" ? 0 : value))
      .min(0, t("positiveActiveTime"))
      .max(8, t("activeSportTime"))
      .nullable(),
    waterNorm: yup
      .number()
      .transform((value, originalValue) => {
        if (originalValue === "") return 0;
        return parseFloat(originalValue.replace(",", "."));
      })
      .min(0, t(""))
      .max(10, t("dailyWaterConsumption"))
      .nullable(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      gender: "female",
      weight: "",
      activeHours: 0,
      waterNorm: 1.8,
    },
  });

  const calculateWaterNorm = (gender, weight, activeHours = 0) => {
    if (!gender || !weight) {
      return 0;
    }
    const genderCoefficients = {
      female: { weightMultiplier: 0.03, hoursMultiplier: 0.4 },
      male: { weightMultiplier: 0.04, hoursMultiplier: 0.6 },
    };
    const coefficients = genderCoefficients[gender];
    if (!coefficients) {
      return 0;
    }
    const water =
      weight * coefficients.weightMultiplier +
      activeHours * coefficients.hoursMultiplier;
    return Math.round(water * 100) / 100;
  };

  const watchFields = watch(["gender", "weight", "activeHours"]);

  useEffect(() => {
    const [gender, weight, activeHours] = watchFields;

    const waterAmount = calculateWaterNorm(gender, weight, activeHours);
    setNormaWater(waterAmount);
  }, [watchFields]);

  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("gender", user.gender || "female");
      setValue("weight", user.weight || "");
      setValue("activeHours", user.activeHours || "");
      setValue(
        "waterNorm",
        user.waterNorm ? user.waterNorm / 1000 : watch("waterNorm") || "1.8"
      );

      if (user.avatarUrl) {
        setAvatarURL(user.avatarUrl);
      }
    }
  }, [user, setValue, watch]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("gender", data.gender);
      formData.append("weight", data.weight);
      formData.append("activeHours", data.activeHours);
      formData.append("waterNorm", data.waterNorm * 1000);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }
      await dispatch(updateUser(formData)).unwrap();
      toast.success("Data successfully updated!");
      reset();
    } catch (error) {
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
    <form onSubmit={handleSubmit(onSubmit)} className={css.userSettingsForm}>
      <div className={css.userAvatarContainer}>
        <button className={css.uploadPhotoBtn}>
          {avatarURL || user.avatar ? (
            <img
              src={avatarURL || user.avatar}
              alt="User Avatar"
              className={css.userAvatar}
            />
          ) : (
            <FaUserCircle className={css.iconUser} />
          )}
          <div className={css.btnIconContainer}>
            <svg className={css.uploadPhotoSvg}>
              <use href={`${icons}#icon-upload`} />
            </svg>
            <span className={css.inputText}>{t("uploadPhoto")}</span>
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
        <fieldset className={css.genderLegend}>
          <legend className={css.genderLegendText}>
            {t("genderIdentity")}
          </legend>
          <label className={css.genderLabel}>
            <input
              type="radio"
              className={css.genderInput}
              value="female"
              name="gender"
              {...register("gender")}
            />
            {t("woman")}
          </label>
          <label className={css.genderLabel}>
            <input
              type="radio"
              className={css.genderInput}
              value="male"
              name="gender"
              {...register("gender")}
            />
            {t("man")}
          </label>
          {errors.gender && (
            <p className={css.error}>{errors.gender.message}</p>
          )}
        </fieldset>
        <div className={css.userInfoContainer}>
          <label className={css.userInfoBoldLabel}>
            {t("yourName")}
            <input
              type="text"
              name="name"
              className={css.userInfoField}
              {...register("name")}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </label>
          <label className={css.userInfoBoldLabel}>
            {t("email")}
            <input
              type="email"
              name="email"
              className={css.userInfoField}
              {...register("email")}
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </label>
        </div>
        <div className={css.userInfoContainer}>
          <h3 className={css.inputTitle}>{t("dailyNorm")}</h3>
          <div className={css.normaWaterContainer}>
            <div>
              <h4 className={css.normaGenderTitle}>{t("forWoman")}</h4>
              <p className={css.greenText}>V=(M*0,03) + (T*0,4)</p>
            </div>
            <div>
              <h4 className={css.normaGenderTitle}>{t("forMan")}</h4>
              <p className={css.greenText}>V=(M*0,04) + (T*0,6)</p>
            </div>
          </div>
          <div className={css.normaWaterTextContainer}>
            <p className={css.normaWaterText}>
              <span className={css.greenText}>*</span> {t("formulaExplanation")}
            </p>
          </div>
          <div className={css.activeTimeContainer}>
            <svg width="20" height="21">
              <use href={`${icons}#icon-exclamation-mark`} />
            </svg>
            <p className={css.inputText}>{t("activeTime")}</p>
          </div>
        </div>
        <div className={css.userInfoContainer}>
          <label className={css.userInfoLabel}>
            {t("yourWeight")}
            <input
              type="number"
              name="weight"
              {...register("weight")}
              className={css.userInfoField}
            />
            {errors.weight && (
              <p className={css.error}>{errors.weight.message}</p>
            )}
          </label>
          <label className={css.userInfoLabel}>
            {t("activeSportsTime")}
            <input
              type="number"
              name="activeHours"
              {...register("activeHours")}
              className={css.userInfoField}
            />
            {errors.activeHours && (
              <p className={css.error}>{errors.activeHours.message}</p>
            )}
          </label>
        </div>
        <div className={css.userInfoContainer}>
          <div className={css.amountOfWaterContainer}>
            <p className={css.amountOfWaterText}>{t("requiredWaterAmount")}</p>
            <span className={css.greenText}>{normaWater}L</span>
          </div>
          <label className={css.userInfoBoldLabel}>
            {t("recordWaterIntake")}
            <input
              type="number"
              step="0.1"
              name="waterNorm"
              {...register("waterNorm")}
              className={css.userInfoField}
              defaultValue={1.8}
            />
          </label>
        </div>
      </div>
      <button type="submit" className={css.saveBtn}>
        {t("save")}
      </button>
    </form>
  );
};

export default UserSettingsForm;
