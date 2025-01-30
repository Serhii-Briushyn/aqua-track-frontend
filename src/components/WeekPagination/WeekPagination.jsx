import { useDispatch, useSelector } from "react-redux";


import {
  selectCurrentWeek,
  selectIsLoading,
} from "../../redux/water/selectors";
import { setCurrentWeek } from "../../redux/water/slice";

import icons from "../../assets/icons/icons.svg";

import css from "../WeekPagination/WeekPagination.module.css";

const WeekPagination = () => {
  const dispatch = useDispatch();
  const currentWeek = useSelector(selectCurrentWeek);
  const isLoading = useSelector(selectIsLoading);

  const isNextDisabled =
    isLoading || new Date(currentWeek.endDate) >= new Date();
  const isPrevDisabled = isLoading;

  const handleWeekChange = (direction) => {
    if (isLoading) return;

    const currentStart = new Date(currentWeek.startDate);
    const currentEnd = new Date(currentWeek.endDate);

    if (direction > 0 && isNextDisabled) {
      return;
    }

    currentStart.setDate(currentStart.getDate() + direction * 7);
    const newStartDate = currentStart.toISOString();

    currentEnd.setDate(currentEnd.getDate() + direction * 7);
    const newEndDate = currentEnd.toISOString();

    dispatch(setCurrentWeek({ startDate: newStartDate, endDate: newEndDate }));
  };

  return (
    <div className={css.pagination}>
      <button
        className={css.arrowBtn}
        onClick={() => handleWeekChange(-1)}
        disabled={isPrevDisabled}
      >
        <svg className={css.icon} aria-hidden="true">
          <use href={`${icons}#icon-arrow-left`} />
        </svg>
      </button>
      <div className={css.date}>
        {new Date(currentWeek.startDate).toLocaleDateString(undefined, {
          day: "2-digit",
          month: "2-digit",
        })}{" "}
        -{" "}
        {new Date(currentWeek.endDate).toLocaleDateString(undefined, {
          day: "2-digit",
          month: "2-digit",
        })}
      </div>
      <button
        className={css.arrowBtn}
        onClick={() => handleWeekChange(1)}
        disabled={isNextDisabled}
      >
        <svg className={css.icon} aria-hidden="true">
          <use href={`${icons}#icon-arrow-right`} />
        </svg>
      </button>
    </div>
  );
};

export default WeekPagination;
