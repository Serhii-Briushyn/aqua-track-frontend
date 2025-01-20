import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";
import { CircularProgress } from "@mui/material";

const DailyInfo = ({ dailyData, isLoading, selectedDate, onSubmitSuccess }) => {
  const getHeaderTitle = () => {
    const today = new Date();
    const isToday =
      today.toDateString() === new Date(selectedDate).toDateString();

    if (isToday) {
      return "Today";
    }

    const options = { day: "numeric", month: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(selectedDate);
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
        <WaterList dailyData={dailyData} onSubmitSuccess={onSubmitSuccess} />
      )}
    </div>
  );
};

export default DailyInfo;
