import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";
import { CircularProgress } from "@mui/material";
import {useSelector} from "react-redux";
import { selectIsLoading as selectWaterIsLoading } from "../../redux/water/selectors.js";
import { useTranslation } from "react-i18next";
import { ukMonthsGenitive } from "../../utils/monthsLocalization.js";

const DailyInfo = ({ dailyData, selectedDate, onSubmitSuccess }) => {

  const isLoading = useSelector(selectWaterIsLoading);
  const { t, i18n } = useTranslation();

const getHeaderTitle = () => {
      const today = new Date();
      const isToday =
        today.toDateString() === new Date(selectedDate).toDateString();

      if (isToday) {
        return t("today");
      }

      const inputDate = new Date(selectedDate);
      if (isNaN(inputDate.getTime())) {
        return t("Invalid Date");
      }

      const day = new Intl.DateTimeFormat(i18n.language, {
        day: "numeric",
      }).format(inputDate);
      let month = new Intl.DateTimeFormat(i18n.language, {
        month: "long",
      }).format(inputDate);

      if (i18n.language === "uk" && ukMonthsGenitive[month.toLowerCase()]) {
        month = ukMonthsGenitive[month.toLowerCase()];
      }

      month = month.charAt(0).toUpperCase() + month.slice(1);

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
