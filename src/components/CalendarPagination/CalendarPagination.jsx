import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { selectCurrentMonth } from "../../redux/water/selectors";
import { setCurrentMonth } from "../../redux/water/slice";

import icons from "../../assets/icons/icons.svg";

import css from "../CalendarPagination/CalendarPagination.module.css";

const CalendarPagination = () => {
  const dispatch = useDispatch();
  const currentMonth = useSelector(selectCurrentMonth);
  const { i18n } = useTranslation();

  const handleMonthChange = (direction) => {
    const newMonth = currentMonth.month + direction;
    let year = currentMonth.year;

    if (newMonth < 0) {
      year -= 1;
      dispatch(setCurrentMonth({ year, month: 11 })); 
    } else if (newMonth > 11) {
      year += 1;
      dispatch(setCurrentMonth({ year, month: 0 }));
    } else {
      dispatch(setCurrentMonth({ year, month: newMonth })); 
    }
  };

  return (
    <div className={css.pagination}>
      <button className={css.arrowBtn} onClick={() => handleMonthChange(-1)}>
        <svg className={css.icon} aria-hidden="true">
          <use href={`${icons}#icon-arrow-left`} />
        </svg>
      </button>
      <div className={css.date}>
        {new Date(currentMonth.year, currentMonth.month).toLocaleString(
          i18n.language,
          {
            month: "long",
          }
        ) +
          ", " +
          currentMonth.year}
      </div>
      <button className={css.arrowBtn} onClick={() => handleMonthChange(1)}>
        <svg className={css.icon} aria-hidden="true">
          <use href={`${icons}#icon-arrow-right`} />
        </svg>
      </button>
    </div>
  );
};

export default CalendarPagination;

