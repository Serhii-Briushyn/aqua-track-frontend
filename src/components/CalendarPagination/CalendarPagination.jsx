import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

import css from "../CalendarPagination/CalendarPagination.module.css";

const CalendarPagination = ({ currentMonth, onMonthChange }) => {
  const handleMonthChange = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + direction);
    if (onMonthChange) {
      onMonthChange(newDate);
    }
  };

  return (
    <div className={css.pagination}>
      <button
        className={css.arrowBtn}
        onClick={() => handleMonthChange(-1)}
        aria-label="Previous month"
      >
        <MdOutlineKeyboardArrowLeft
          style={{ fontSize: "22px", color: "#323F47" }}
        />
      </button>
      <div className={css.date}>
        {currentMonth.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </div>
      <button
        className={css.arrowBtn}
        onClick={() => handleMonthChange(1)}
        aria-label="Next month"
      >
        <MdOutlineKeyboardArrowRight
          style={{ fontSize: "22px", color: "#323F47" }}
        />
      </button>
    </div>
  );
};

export default CalendarPagination;
