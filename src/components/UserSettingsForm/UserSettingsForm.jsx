import React from "react";
import { useForm } from "react-hook-form";
import css from "./UserSettingsForm.module.css";
import { FaUserCircle } from "react-icons/fa";
import { icons as sprite } from "../../assets/index.js";

const UserSettingsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.userSettingsForm}>
      <div className={css.settingsForm}>
        <div className={css.userInfoContainer}>
          <h3 className={`${css.inputTitle}`}>My Daily Norma</h3>
          <div className={css.normaWaterContainer}>
            <div>
              <h4 className={`${css.normaGenderTitle} ${css.inputText}`}>
                For Woman
              </h4>
              <p className={css.greenText}>V=(M*0,03) + (T*0,4)</p>
            </div>
            <div>
              <h4 className={`${css.normaGenderTitle} ${css.inputText}`}>
                For Man
              </h4>
              <p className={css.greenText}>V=(M*0,04) + (T*0,6)</p>
            </div>
          </div>
          <div className={css.normaWaterTextContainer}>
            <p className={`${css.normaWaterText} ${css.formulaDescription}`}>
              <span className={css.greenText}>*</span> V is the volume of the
              water norm in liters per day, M is your body weight, T is the time
              of active sports, or another type of activity commensurate in
              terms of loads (in the absence of these, you must set 0)
            </p>
          </div>
          <div className={css.activeTimeContainer}>
            <p className={css.inputText}>Active Time in Hours</p>
          </div>
        </div>
        <div className={css.userInfoContainer}>
          <label className={`${css.userInfoLabel} ${css.inputText}`}>
            Your Weight in Kilograms
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
            Active Participation
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
              className={`${css.amountOfWaterText} ${css.inputText} ${css.formulaDescriptionContainer}`}
            >
              Water Requirement Amount
            </p>
            <span className={css.amountOfWaterText}>0.0L</span>
          </div>
          <label className={`${css.userInfoLabel} ${css.inputTitle}`}>
            Water You Will Drink
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
  );
};

export default UserSettingsForm;
