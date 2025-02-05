import { useSelector, useDispatch } from "react-redux";

import {
  selectCurrentDate,
  selectCurrentMonth,
  selectIsLoadingMonthly,
  selectMonthlyData,
} from "../../redux/water/selectors";
import { setCurrentDate } from "../../redux/water/slice";

import { getMonthDates } from "../../utils/getMonthDates";

import css from "./Calendar.module.css";

const Calendar = () => {
  const dispatch = useDispatch();
  const monthlyData = useSelector(selectMonthlyData);
  const selectedDate = useSelector(selectCurrentDate);
  const currentMonth = useSelector(selectCurrentMonth);
  const isLoading = useSelector(selectIsLoadingMonthly);

  const selectedMonth = getMonthDates(
    currentMonth.year,
    currentMonth.month
  ).map((dateObj, index) => ({
    ...dateObj,
    ...monthlyData[index],
  }));

  const handleDateClick = (date) => {
    dispatch(setCurrentDate(date));
  };

  return (
    <div className={css.calendar} data-tour="calendar-section">
      {selectedMonth.map((data, index) => {
        const isoDate = data.date.split("T")[0];
        const isSelected = selectedDate === isoDate;
        const percentage = Math.min(data.percentage || 0, 100);
        const dayNumber = index + 1;

        return (
          <div
            key={index}
            className={`${css.dateContainer} ${
              isSelected ? css.selectedContainer : ""
            }`}
          >
            <div
              className={`${css.date} ${
                isLoading
                  ? css.loading
                  : isSelected
                  ? css.selected
                  : percentage >= 100
                  ? css.full
                  : css.default
              }`}
              onClick={() => handleDateClick(isoDate)}
            >
              <div className={css.dateVal}>{dayNumber}</div>
            </div>
            <span className={css.percentage}>
              {percentage > 0 ? `${Math.round(percentage)}%` : "0%"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
