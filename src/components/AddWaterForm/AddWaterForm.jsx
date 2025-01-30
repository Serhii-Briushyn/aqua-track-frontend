import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import * as yup from "yup";

import { createWaterOperation } from "../../redux/water/operations";
import { selectCurrentDate } from "../../redux/water/selectors";
import { triggerRefetch } from "../../redux/water/slice";
import icons from "../../assets/icons/icons.svg";

import css from "./AddWaterForm.module.css";

const AddWaterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectCurrentDate);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const schema = yup.object().shape({
    amount: yup
      .number()
      .min(50, t("minAmount"))
      .max(5000, t("maxAmount"))
      .required(t("amountRequired")),
    time: yup.string().required(t("timeRequired")),
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: 50,
      time: "",
    },
  });

  const amount = watch("amount");

  useEffect(() => {
    const now = new Date();
    setValue("time", now.toTimeString().slice(0, 5));
    setValue("amount", 50);
  }, [setValue]);

  const handleAmountChange = (newAmount) => {
    const clampedAmount = Math.max(50, Math.min(5000, newAmount));
    setValue("amount", clampedAmount);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const waterData = {
      amount: data.amount,
      date: `${currentDate}T${data.time}:00`,
    };
    try {
      await dispatch(createWaterOperation(waterData)).unwrap();
      toast.success(t("successAdded"));
      dispatch(triggerRefetch());
      onClose();
    } catch (error) {
      toast.error(t(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <p className={css.amountSubtitle}>{t("chooseValue")}</p>

      <label className={css.text}>{t("waterAmount")}:</label>
      <div className={css.amountWrapper}>
        <button
          type="button"
          className={css.amountButton}
          onClick={() => handleAmountChange(amount - 50)}
        >
          <svg className={css.icon} aria-hidden="true">
            <use href={`${icons}#icon-minus-circle`} />
          </svg>
        </button>
        <span className={css.amountValue}>
          {amount} {t("ml")}
        </span>
        <button
          type="button"
          className={css.amountButton}
          onClick={() => handleAmountChange(amount + 50)}
        >
          <svg className={css.icon} aria-hidden="true">
            <use href={`${icons}#icon-plus-circle`} />
          </svg>
        </button>
      </div>

      <label className={css.text} htmlFor="time">
        {t("recordTime")}
      </label>
      <Controller
        name="time"
        control={control}
        render={({ field }) => (
          <input id="time" className={css.input} type="time" {...field} />
        )}
      />
      {errors.time && <p className={css.errorMessage}>{errors.time.message}</p>}

      <label className={css.textBold}>{t("enterValue")}</label>
      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="number"
            className={css.input}
            onChange={(e) => {
              const value = parseInt(e.target.value || "50", 10);
              handleAmountChange(value);
            }}
          />
        )}
      />
      {errors.amount && (
        <p className={css.errorMessage}>{errors.amount.message}</p>
      )}

      <button
        type="submit"
        className={`${css.submitButton} ${isSubmitting ? css.disabled : ""}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? t("saving") : t("save")}
      </button>
    </form>
  );
};

export default AddWaterForm;
