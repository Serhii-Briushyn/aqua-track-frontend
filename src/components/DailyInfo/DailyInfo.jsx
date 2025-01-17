import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";
import { CircularProgress } from "@mui/material";
const DailyInfo = ({ dailyData, isLoading, selectedDate, onSubmitSuccess }) => {
  return (
    <div data-tour="step-5">
      <div className={css.infoHeader}>
        <h2 className={css.h2}>Today</h2>
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
