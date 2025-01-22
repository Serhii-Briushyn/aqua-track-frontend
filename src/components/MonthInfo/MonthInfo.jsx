import { useState } from "react";
import { useTranslation } from "react-i18next";

import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import icons from "../../assets/icons/icons.svg";
import Chart from "../Chart/Chart.jsx";

import css from "./MonthInfo.module.css";

const MonthInfo = ({
  monthlyData,
  selectedDate,
  currentMonth,
  onChangeMonth,
  onChangeDate,
}) => {
  const [isCalendarView, setIsCalendarView] = useState(true);
  const { t } = useTranslation();

  return (
    <div className={css.monthInfo}>
      <div className={css.headingPanel}>
        <h2 className={css.h2}>
          {isCalendarView ? t("month") : t("statistics")}
        </h2>
        <div className={css.infoNav}>
          <CalendarPagination
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            handleMonthChange={onChangeMonth}
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
      {isCalendarView ? (
        <Calendar
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          changeMonth={onChangeMonth}
          monthValues={monthlyData}
          onDateSelect={(date) => onChangeDate(date)}
        />
      ) : (
        <Chart data={monthlyData} />
      )}
    </div>
  );
};

export default MonthInfo;
