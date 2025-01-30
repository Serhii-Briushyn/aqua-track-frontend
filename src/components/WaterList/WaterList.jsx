import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import WaterItem from "../WaterItem/WaterItem";
import {
  selectCurrentDate,
  selectDailyData,
} from "../../redux/water/selectors";

import "./simplebar.lib.css";
import css from "./WaterList.module.css";

const WaterList = () => {
  const dailyData = useSelector(selectDailyData);
  const { t } = useTranslation();

  const currentDate = useSelector(selectCurrentDate);
  const today = new Date().toISOString().split("T")[0];

  const isFutureDate = currentDate > today;

  return (
    <div className={css.waterList}>
      <SimpleBar autoHide={false}>
        <div className={css.waterItemsList}>
          {isFutureDate ? (
            <p className={css.text}>
              {t("futureMessagePart1")}
              <br />
              {t("futureMessagePart2")}
            </p>
          ) : dailyData.length ? (
            dailyData.map((item, index) => (
              <div key={index}>
                <WaterItem item={item} />
              </div>
            ))
          ) : (
            <p className={css.text}>
              {t("messagePart1")}
              <br />
              {t("messagePart2")}
            </p>
          )}
        </div>
      </SimpleBar>
    </div>
  );
};

export default WaterList;
