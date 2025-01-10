import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import css from "./UserSettingsForm.module.css";
import icons from "../../assets/icons/icons.svg";

Modal.setAppElement("#modal-root");

const UserSettingsForm = () => {
  const [avatarURL, setAvatarURL] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (location.pathname === "/user-settings") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [location]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const avatarURL = URL.createObjectURL(file);
      setAvatarURL(avatarURL);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
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
              <span className={css.inputText}>Upload Photo</span>
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
          <div>
            <fieldset className={css.genderContainer}>
              <legend className={`${css.genderLegend} ${css.inputTitle}`}>
                Your Gender Identity
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
            </fieldset>
          </div>
          <div className={css.userInfoContainer}>
            <label className={`${css.userInfoLabel} ${css.inputTitle}`}>
              Your Name
              <input
                type="text"
                name="name"
                className={`${css.userInfoField} ${css.inputText}`}
                {...register("name")}
              />
            </label>
            <label className={`${css.userInfoLabel} ${css.inputTitle}`}>
              Email
              <input
                type="email"
                name="email"
                className={`${css.userInfoField} ${css.inputText}`}
                {...register("email")}
              />
            </label>
          </div>
        </div>
        <div className={css.settingsForm}>
          <div className={css.userInfoContainer}>
            <h3 className={`${css.inputTitle}`}>My Daily Norma</h3>
            <div className={css.normaWaterContainer}>
              <div>
                <h4 className={`${css.normaGenderTitle} ${css.inputText}`}>
                  For Woman:
                </h4>
                <p className={css.greenText}>V=(M*0,03) + (T*0,4)</p>
              </div>
              <div>
                <h4 className={`${css.normaGenderTitle} ${css.inputText}`}>
                  For Man:
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
              <p className={css.inputText}>Active Time in Hours</p>
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
              <span className={css.amountOfWaterText}>0.0L</span>
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
    </Modal>
  );
};

export default UserSettingsForm;
