import { useDispatch, useSelector } from "react-redux";

import {
  selectMonthlyData,
  selectSelectedDate,
} from "../../redux/water/selectors.js";
import { getDailyWaterOperation } from "../../redux/water/operations.js";
import { setSelectedDate } from "../../redux/water/slice.js";
import {
  getDateBackgroundColor,
  getDateTextColor,
} from "../../utils/dateUtils.js";

import css from "./Calendar.module.css";

const Calendar = () => {
  const dispatch = useDispatch();
  const monthDates = useSelector(selectMonthlyData);
  const selectedDate = useSelector(selectSelectedDate);

  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    dispatch(setSelectedDate(formattedDate));
    dispatch(getDailyWaterOperation({ date: formattedDate }));
  };

  return (
    <div className={css.calendar}>
      {monthDates.map((dateObj) => {
        const date = new Date(dateObj.date);
        const percentage = (dateObj.percentage || 0).toFixed(0);

        return (
          <div key={date.toISOString()} className={css.dateContainer}>
            <div
              className={css.date}
              style={{
                backgroundColor: getDateBackgroundColor(
                  date,
                  selectedDate,
                  percentage
                ),
                color: getDateTextColor(date, selectedDate),
              }}
              onClick={() => handleDateClick(date)}
            >
              <div className={css.dateVal}>{date.getDate()}</div>
            </div>
            <span className={css.val}>{percentage}%</span>
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
