import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { createWaterOperation, updateWaterOperation } from "../../redux/water/operations";
import toast from "react-hot-toast";
import css from "./WaterForm.module.css";
import icons from "../../assets/icons/icons.svg";

const schema = yup.object().shape({
  amount: yup
    .number()
    .min(50, "Minimum amount is 50ml")
    .max(5000, "Maximum amount is 5000ml")
    .required("Amount is required"),
  time: yup
    .string()
    .required("Time is required"),
});

const WaterForm = ({ source, isOpen, onClose, modalData, onSubmitSuccess }) => {
  const dispatch = useDispatch();

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
    if (isOpen) {
      if (source === "AddWater") {
        const now = new Date();
        setValue("time", now.toTimeString().slice(0, 5));
        setValue("amount", 50);
      } else if (source === "EditWater" && modalData) {
        setValue("time", modalData.time || "");
        setValue("amount", modalData.volume || 250);
      }
    }
  }, [isOpen, source, modalData, setValue]);

  const onSubmit = (data) => {
    const [hours, minutes] = data.time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    const waterData = {
      amount: data.amount,
      date: date.toISOString(),
    };

    const action =
      source === "AddWater"
        ? createWaterOperation(waterData)
        : updateWaterOperation({ id: modalData.id, data: waterData });

    dispatch(action)
      .then(({ error }) => {
        if (!error) {
          toast.success("Operation successful!");
          onClose();
          onSubmitSuccess?.();
        } else {
          toast.error("An error occurred. Please try again.");
        }
      })
      .catch(() => {
        toast.error("Dispatch failed. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className={css.amountSubtitle}>
        {source === "AddWater" ? "Adding water to your daily log" : "Editing water entry"}
      </p>

      <label className={css.text}>Amount of water:</label>
      <div className={css.amountWrapper}>
        <button
          type="button"
          className={css.amountButton}
          onClick={() => setValue("amount", Math.max(amount - 50, 50))}
        >
          <svg className={css.icon} aria-hidden="true">
            <use href={`${icons}#icon-minus-circle`} />
          </svg>
        </button>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => <span className={css.amountValue}>{field.value} ml</span>}
        />
        <button
          type="button"
          className={css.amountButton}
          onClick={() => setValue("amount", Math.min(amount + 50, 5000))}
        >
          <svg className={css.icon} aria-hidden="true">
            <use href={`${icons}#icon-plus-circle`} />
          </svg>
        </button>
      </div>
      {errors.amount && <p className={css.error}>{errors.amount.message}</p>}

      <label className={css.text} htmlFor="time">Recording time:</label>
      <Controller
        name="time"
        control={control}
        render={({ field }) => (
          <input
            className={css.input}
            type="time"
            {...field}
          />
        )}
      />
      {errors.time && <p className={css.error}>{errors.time.message}</p>}

      <button type="submit" className={css.submitButton}>Save</button>
    </form>
  );
};

export default WaterForm;