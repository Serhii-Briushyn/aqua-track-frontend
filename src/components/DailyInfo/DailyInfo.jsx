import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { format, isToday } from "date-fns";

import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterList from "../WaterList/WaterList";
import {
  selectSelectedDate,
  selectWaterIsLoading,
} from "../../redux/water/selectors";

import css from "./DailyInfo.module.css";

const DailyInfo = () => {
  const isLoading = useSelector(selectWaterIsLoading);
  const selectedDate = useSelector(selectSelectedDate);

  const formatDate = (date) => {
    const dateObj = date instanceof Date ? date : new Date(date);

    if (isToday(dateObj)) {
      return "Today";
    }

    return format(dateObj, "d, MMMM");
  };

  return (
    <div>
      <div className={css.infoHeader}>
        <h2 className={css.h2}>{formatDate(selectedDate)}</h2>
        <AddWaterBtn type="waterDetail" />
      </div>
      {isLoading ? (
        <div className={css.loaderWrapper}>
          <CircularProgress color="#9be1a0" />
        </div>
      ) : (
        <WaterList />
      )}
    </div>
  );
};

export default DailyInfo;
