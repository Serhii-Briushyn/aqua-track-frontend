import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";
import { CircularProgress } from "@mui/material";
const DailyInfo = ({ dailyData, isLoading }) => {
  return (
    <div>
      <div className={css.infoHeader}>
        <h2 className={css.h2}>Today</h2>
        <AddWaterBtn type="waterDetail" />
      </div>
      {isLoading ? (
        <div className={css.loaderWrapper}>
          <CircularProgress color="#9be1a0" />
        </div>
      ) : (
        <WaterList dailyData={dailyData} />
      )}
    </div>
  );
};

export default DailyInfo;
