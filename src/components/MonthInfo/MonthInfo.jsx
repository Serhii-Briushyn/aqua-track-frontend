import { useState } from "react";
import { useTranslation } from "react-i18next";

import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import WeekPagination from "../WeekPagination/WeekPagination.jsx";
import Calendar from "../Calendar/Calendar.jsx";
import Chart from "../Chart/Chart.jsx";

import icons from "../../assets/icons/icons.svg";

import css from "./MonthInfo.module.css";

const MonthInfo = () => {
  const [isCalendarView, setIsCalendarView] = useState(true);
  const { t } = useTranslation();

  return (
    <div className={isCalendarView ? css.monthInfo : css.weekInfo}>
      <div className={css.headingPanel}>
        <h2 className={css.subtitle}>
          {isCalendarView ? t("month") : t("statistics")}
        </h2>
        <div className={css.infoNav}>
          {isCalendarView ? <CalendarPagination /> : <WeekPagination />}
          <button
            className={isCalendarView ? css.buttonMonth : css.buttonWeek}
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
