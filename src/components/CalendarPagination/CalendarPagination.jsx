import { useTranslation } from "react-i18next";

import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

import css from "../CalendarPagination/CalendarPagination.module.css";

const CalendarPagination = ({ handleMonthChange, currentMonth }) => {
  const { i18n } = useTranslation();

  return (
    <div className={css.pagination}>
      <button
        className={css.arrowBtn}
        onClick={() => handleMonthChange(-1)} // Move to the previous month
      >
        <MdOutlineKeyboardArrowLeft
          style={{ fontSize: "22px", color: "#323F47" }}
        />
      </button>
      <div className={css.date}>
        {currentMonth.toLocaleString(i18n.language, { month: "long" }) +
          ", " +
          currentMonth.getFullYear()}
      </div>
      <button
        className={css.arrowBtn}
        onClick={() => handleMonthChange(1)} // Move to the next month
      >
        <MdOutlineKeyboardArrowRight
          style={{ fontSize: "22px", color: "#323F47" }}
        />
      </button>
    </div>
  );
};

export default CalendarPagination;
