import { useEffect } from "react";
import icons from "../../assets/icons/icons.svg";
import css from "./WaterForm.module.css";
import { Controller, useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const WaterForm = ({ source, isOpen, modalData, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    volume: Yup.number()
      .required("The amount of water is required.")
      .min(50, "Minimum value is 50ml.")
      .max(5000, "Maximum value is 5000ml."),
    time: Yup.string()
      .required("The time of recording is required.")
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format."),
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      volume: 50,
      time: "",
    },
  });

  const volume = watch("volume");

  useEffect(() => {
    if (isOpen) {
      if (source === "AddWater") {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        reset({
          volume: 50,
          time: `${hours}:${minutes}`,
        });
      } else if (source === "EditWater" && modalData) {
        reset({
          volume: modalData.volume || 250,
          time: modalData.time || "",
        });
      }
    }
  }, [isOpen, source, modalData, reset]);

  const handleDecrease = () => {
    setValue("volume", Math.max(volume - 50, 0));
  };

  const handleIncrease = () => {
    setValue("volume", Math.min(volume + 50, 5000));
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={css.amountSubtitle}>
        {source === "AddWater"
          ? "Adding water to your daily log"
          : "Editing water entry"}
      </p>
      <span className={css.text}>Amount of water:</span>
      <div className={css.amountWrapper}>
        <button
          className={css.amountButton}
          type="button"
          onClick={handleDecrease}
        >
          <svg className={css.icon} aria-hidden="true">
            <use href={`${icons}#icon-minus-circle`} />
          </svg>
        </button>

        <span className={css.amountValue}>{volume} ml</span>

        <button
          className={css.amountButton}
          type="button"
          onClick={handleIncrease}
        >
          <svg className={css.icon} aria-hidden="true">
            <use href={`${icons}#icon-plus-circle`} />
          </svg>
        </button>
      </div>
      {errors.volume && <p className={css.error}>{errors.volume.message}</p>}

      <div className={css.fieldsWrapper}>
        <label className={css.text} htmlFor="time">
          Recording time:
        </label>
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <input {...field} className={css.input} type="time" />
          )}
        />
        {errors.time && <p className={css.error}>{errors.time.message}</p>}

        <label className={css.fieldSubtitle} htmlFor="volume">
          Enter the value of the water used:
        </label>
              <Controller
          name="volume"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className={css.input}
              type="number"
              id="volume"
              min="50"
              max="5000"
            />
          )}
        />
      </div>

      <div className={css.actions}>
        <button className={css.submitButton} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default WaterForm;
