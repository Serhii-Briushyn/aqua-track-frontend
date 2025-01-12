import { useEffect, useState } from "react";

import icons from "../../assets/icons/icons.svg";

import css from "./WaterForm.module.css";

const WaterForm = ({ source, isOpen, onClose, modalData }) => {
  const [amount, setAmount] = useState(250);
  const [currentTime, setCurrentTime] = useState("");

  const handleDecrease = () => {
    setAmount((prev) => Math.max(prev - 50, 0));
  };

  const handleIncrease = () => {
    setAmount((prev) => Math.min(prev + 50, 5000));
  };

  useEffect(() => {
    if (isOpen) {
      if (source === "AddWater") {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        setCurrentTime(`${hours}:${minutes}`);
        setAmount(50);
      } else if (source === "EditWater" && modalData) {
        setCurrentTime(modalData.time || "");
        setAmount(modalData.volume || 250);
      }
    }
  }, [isOpen, source, modalData]);

  return (
    <>
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

        <span className={css.amountValue}>{amount} ml</span>

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

      <div className={css.fieldsWrapper}>
        <label className={css.text} htmlFor="date">
          Recording time:
        </label>
        <input
          className={css.input}
          type="time"
          name="date"
          id="date"
          value={currentTime}
          onChange={(e) => setCurrentTime(e.target.value)}
        />

        <label className={css.fieldSubtitle} htmlFor="value">
          Enter the value of the water used:
        </label>
        <input
          className={css.input}
          type="number"
          name="value"
          id="value"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={onClose} className={css.submitButton} type="submit">
        Save
      </button>
    </>
  );
};

export default WaterForm;
