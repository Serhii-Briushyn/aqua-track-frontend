import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";
import { CircularProgress } from "@mui/material";
import {useSelector} from "react-redux";
import {selectIsLoading as selectWaterIsLoading} from "../../redux/water/selectors.js";
const DailyInfo = ({ dailyData, selectedDate, onSubmitSuccess }) => {

  const isLoading = useSelector(selectWaterIsLoading);

  const getHeaderTitle = () => {
    const today = new Date();
    const isToday =
      today.toDateString() === new Date(selectedDate).toDateString();

    if (isToday) {
      return "Today";
    }

    const day = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(selectedDate);
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(selectedDate);

    return `${day}, ${month}`;
  };

  return (
    <div>
      <div className={css.infoHeader}>
        <h2 className={css.h2}>{getHeaderTitle()}</h2>
        <AddWaterBtn
          type="waterDetail"
          selectedDate={selectedDate}
          onSubmitSuccess={onSubmitSuccess}
        />
      </div>
      {isLoading ? (
        <div className={css.loaderWrapper}>
          <CircularProgress color="#9be1a0" />
        </div>
      ) : (
        <WaterList
          dailyData={dailyData}
          onSubmitSuccess={onSubmitSuccess}
        />
      )}
    </div>
  );
};

export default DailyInfo;
