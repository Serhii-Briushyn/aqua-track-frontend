import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { IconPlus } from "../../components/Icons/IconPlus";
import { IconMinus } from "../Icons/IconMinus";

import { getCurrentTime } from "../../helpers/getCurrentTime";

import css from "./WaterForm.module.css";

import { convertTimeToUnix } from "../../helpers/convertTimeToUnix";
import { useDispatch, useSelector } from "react-redux";
import { addWater, putWater } from "../../redux/water/waterOps";
import toast from "react-hot-toast";
import { selectWaterDate } from "../../redux/selectors";

const schema = yup.object().shape({
  date: yup.string().required("Please, enter the recorded time"),
  amount: yup
    .number()
    .min(10, "Amount of water must be greater than 10 ml")
    .max(2000, "Amount of water must be less than 2000 ml")
    .typeError("Enter a valid amount of water in ml")
    .required("Value is required"),
});

const formatToLocalTime = (timestamp) => {
  const date = new Date(timestamp);
  const offset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - offset);
  return localDate.toISOString().slice(11, 16);
};

export const WaterForm = ({ subtitle, onClose, toggleHandle, water }) => {
  const dispatch = useDispatch();

  const timezoneOffset = new Date().getTimezoneOffset();

  const offset = timezoneOffset * 60 * 1000;

  const day = useSelector(selectWaterDate);

  const defaultValues = water
    ? {
        date: formatToLocalTime(water.date + offset),
        amount: water.amount,
      }
    : {
        date: getCurrentTime(),
        amount: 50,
      };

  const {
    register,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const submitForm = async (data) => {
    const time = data.date;

    const unixTime = convertTimeToUnix(time, day) - offset;

    if (unixTime > Date.now() - offset) {
      toast.error("You can't choose a date in the future."),
        {
          duration: 5000,
          position: "top-center",
          style: {
            textAlign: "center",
            boxShadow: "8px 11px 27px -8px rgba(66, 68, 90, 1)",
          },
        };
      return;
    }

    const dataToSend = {
      amount: data.amount,
      date: unixTime,
    };

    const response = toggleHandle
      ? await dispatch(addWater(dataToSend))
      : await dispatch(putWater([water._id, dataToSend]));

    response.meta.requestStatus === "fulfilled" && onClose();
  };

  const subtract = () => {
    const currentValue = getValues("amount");
    setValue("amount", currentValue - 50);
  };

  const add = () => {
    const currentValue = getValues("amount");
    setValue("amount", currentValue + 50);
  };

  return (
    <form className={css.formWrapper} onSubmit={handleSubmit(submitForm)}>
      <p className={css.subtitle}>{subtitle}</p>
      <span className={css.amountTitle}>Amount of water:</span>
      <div className={css.amountWrapper}>
        <button
          className={css.amountButton}
          onClick={subtract}
          type="button"
          disabled={getValues("amount") === 0 ? true : false}
        >
          <IconMinus className={css.icon} />
        </button>

        <span className={css.amountValue}>{`${watch("amount")} ml`}</span>

        <button
          className={css.amountButton}
          onClick={add}
          type="button"
          disabled={getValues("amount") === 5000 ? true : false}
        >
          <IconPlus className={css.icon} />
        </button>
      </div>

      <div className={css.fieldsWrapper}>
        <label className={css.timeLabel} htmlFor="date">
          Recording time:
          {errors.date && (
            <span className={css.validationError}>{errors.date.message}</span>
          )}
        </label>
        <input
          {...register("date")}
          className={css.input}
          type="time"
          name="date"
          id="date"
        />

        <label className={css.valueLabel} htmlFor="value">
          Enter the value of the water used:
          {errors.amount && (
            <span className={css.validationError}>{errors.amount.message}</span>
          )}
        </label>
        <input
          {...register("amount")}
          className={css.input}
          type="number"
          name="value"
          id="value"
          onChange={(e) => setValue("amount", Number(e.target.value))}
        />
      </div>
      <button className={css.submitButton} type="submit">
        Save
      </button>
    </form>
  );
};
