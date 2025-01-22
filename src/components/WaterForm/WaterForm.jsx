import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import {
  createWaterOperation,
  updateWaterOperation,
} from "../../redux/water/operations";
import toast from "react-hot-toast";
import css from "./WaterForm.module.css";
import icons from "../../assets/icons/icons.svg";
import { useTranslation } from "react-i18next";

const WaterForm = ({ source, isOpen, onClose, modalData, onSubmitSuccess }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const schema = yup.object().shape({
    amount: yup
      .number()
      .min(50, t("minimum"))
      .max(5000, t("maximum"))
      .required(t("amountrqd")),
    time: yup.string().required(t("timerqd")),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: 50,
      time: "",
    },
  });

  const [localAmount, setLocalAmount] = useState("50");

  useEffect(() => {
    if (isOpen) {
      if (source === "AddWater") {
        const now = new Date();
        setValue("time", now.toTimeString().slice(0, 5));
        setValue("amount", 50);
        setLocalAmount("50");
      } else if (source === "EditWater" && modalData) {
        const initialAmount = modalData.amount || 250;

        setValue("time", modalData.time);
        setValue("amount", initialAmount);
        setLocalAmount(initialAmount.toString());
      }
    }
  }, [isOpen, source, modalData, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const waterData = {
        amount: data.amount,
        date: `${new Date().toISOString().slice(0, 10)}T${data.time}:00`,
      };

      const action =
        source === "AddWater"
          ? createWaterOperation(waterData)
          : updateWaterOperation({ id: modalData.id, data: waterData });

      const { error } = await dispatch(action).unwrap();

      if (error) throw new Error("Operation failed");

      toast.success(source === "AddWater" ? t("addition") : t("update"));
      onClose();
      onSubmitSuccess?.();
    } catch (error) {
      toast.error(error.message || t("failed"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <p className={css.amountSubtitle}>
        {source === "AddWater" ? t("chooseValue") : t("correctData")}
      </p>

      <label className={css.text}>{t("waterAmount")}:</label>
      <div className={css.amountWrapper}>
        <button
          type="button"
          className={css.amountButton}
          onClick={() => {
            const newAmount = Math.max(
              parseInt(localAmount || "0", 10) - 50,
              0
            );
            setLocalAmount(newAmount.toString());
            setValue("amount", newAmount);
          }}
        >
          <svg className={css.icon} aria-hidden="true">
            <use href={`${icons}#icon-minus-circle`} />
          </svg>
        </button>
        <span className={css.amountValue}>{localAmount} ml</span>
        <button
          type="button"
          className={css.amountButton}
          onClick={() => {
            const newAmount = Math.min(
              parseInt(localAmount || "0", 10) + 50,
              5000
            );
            setLocalAmount(newAmount.toString());
            setValue("amount", newAmount);
          }}
        >
          <svg className={css.icon} aria-hidden="true">
            <use href={`${icons}#icon-plus-circle`} />
          </svg>
        </button>
      </div>

      <label className={css.text} htmlFor="time">
        {t("recordTime")}
      </label>
      <div className={css.inputBox}>
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <input id="time" className={css.input} type="time" {...field} />
          )}
        />
        {errors.time && <p className={css.error}>{errors.time.message}</p>}
      </div>

      <label className={css.textBold}>{t("enterWaterValue")}</label>
      <div className={css.inputBox}>
        <input
          type="number"
          className={css.input}
          value={localAmount}
          onChange={(e) => {
            const value = e.target.value;

            if (value.length <= 4) {
              setLocalAmount(
                value === "" ? "" : Math.max(parseInt(value, 10), 0).toString()
              );
            }
          }}
          onBlur={() => {
            const finalValue = Math.max(parseInt(localAmount || "0", 10), 0);
            setValue("amount", finalValue);
            setLocalAmount(finalValue.toString());
          }}
        />
        {errors.amount && <p className={css.error}>{errors.amount.message}</p>}
      </div>

      <button
        type="submit"
        className={`${css.submitButton} ${isSubmitting ? css.disabled : ""}`}
        disabled={isSubmitting}
      >
        {t("save")}
      </button>
    </form>
  );
};

export default WaterForm;
