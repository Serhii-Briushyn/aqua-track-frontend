import { useState } from "react";
import { useDispatch } from "react-redux";

import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import Chart from "../Chart/Chart.jsx";
import { getMonthlyWaterOperation } from "../../redux/water/operations.js";

import icons from "../../assets/icons/icons.svg";
import css from "./MonthInfo.module.css";

const MonthInfo = () => {
  const [isCalendarView, setIsCalendarView] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dispatch = useDispatch();

  const handleMonthChange = (newDate) => {
    setCurrentMonth(newDate);
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    dispatch(getMonthlyWaterOperation({ month, year }));
  };

  return (
    <div className={css.monthInfo}>
      <div className={css.headingPanel}>
        <h2 className={css.h2}>{isCalendarView ? "Month" : "Statistics"}</h2>
        <div className={css.infoNav}>
          <CalendarPagination
            currentMonth={currentMonth}
            onMonthChange={handleMonthChange}
          />
          <button
            className={css.toggleView}
            onClick={() => setIsCalendarView(!isCalendarView)}
          >
            <svg>
              <use href={`${icons}#icon-chart`} />
            </svg>
          </button>
        </div>
      </div>
      {isCalendarView ? <Calendar /> : <Chart />}
    </div>
  );
};

export default MonthInfo;
