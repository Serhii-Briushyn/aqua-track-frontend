import css from "./WaterForm.module.css";

const WaterForm = ({ subtitle }) => {
  return (
    <form className={css.formWrapper}>
      <p className={css.subtitle}>{subtitle}</p>
      <span className={css.amountTitle}>Amount of water:</span>
      <div className={css.amountWrapper}>
        <button className={css.amountButton} type="button">
          <svg className={css.icon} aria-hidden="true">
            <use xlinkHref="/src/assets/icons/icons.svg#icon-minus-circle" />
          </svg>
        </button>

        <span className={css.amountValue}></span>

        <button className={css.amountButton} type="button">
          <svg className={css.icon} aria-hidden="true">
            <use xlinkHref="/src/assets/icons/icons.svg#icon-plus-circle" />
          </svg>
        </button>
      </div>

      <div className={css.fieldsWrapper}>
        <label className={css.timeLabel} htmlFor="date">
          Recording time:
        </label>
        <input className={css.input} type="time" name="date" id="date" />

        <label className={css.valueLabel} htmlFor="value">
          Enter the value of the water used:
        </label>
        <input className={css.input} type="number" name="value" id="value" />
      </div>
      <button className={css.submitButton} type="submit">
        Save
      </button>
    </form>
  );
};

export default WaterForm;
