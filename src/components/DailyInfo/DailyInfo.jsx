import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";
import { CircularProgress } from "@mui/material";
const DailyInfo = ({ dailyData, isLoading, selectedDate, onAddWaterSubmitSuccess }) => {
  return (
    <div>
      <div className={css.infoHeader}>
        <h2 className={css.h2}>Today</h2>
        <AddWaterBtn
          type="waterDetail"
          selectedDate={selectedDate}
          onSubmitSuccess={onAddWaterSubmitSuccess}
        />
      </div>
      {isLoading ? (
        <div className={css.loaderWrapper}>
          <CircularProgress color="#9be1a0" />
        </div>
      ) : (
        <WaterList
          dailyData={dailyData}
          onAddWaterSubmitSuccess={onAddWaterSubmitSuccess}
        />
      )}
    </div>
  );
};

export default DailyInfo;
