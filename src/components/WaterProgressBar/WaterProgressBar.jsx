import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  selectSelectedDate,
  selectTotalPercentage,
} from "../../redux/water/selectors";
import { useTranslation } from "react-i18next";

import styles from "./WaterProgressBar.module.css";
import { ukMonthsGenitive } from "../../utils/monthsLocalization";

const WaterProgressBar = () => {
  const totalPercentage = useSelector(selectTotalPercentage);
  const selectedDate = useSelector(selectSelectedDate);
  const [waterLevel, setWaterLevel] = useState(0);
  const [formattedDate, setFormattedDate] = useState("");
  const [isMoving, setIsMoving] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
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

    setFormattedDate(getHeaderTitle());
  }, [selectedDate, totalPercentage, t, i18n.language]);

  useEffect(() => {
    const boundedProgress = Math.min(totalPercentage, 100);
    setWaterLevel(boundedProgress);
  }, [totalPercentage]);

  const handleCircleMove = () => {
    setIsMoving(true);
    setTimeout(() => {
      setIsMoving(false);
    }, 2500);
  };

  useEffect(() => {
    handleCircleMove();
  }, [waterLevel]);

  return (
    <div className={styles.progressBarWrapper}>
      <div className={styles.todayLabel}>{formattedDate}</div>
      <div className={styles.waterProgressBar}>
        <div className={styles.water} style={{ width: `${waterLevel}%` }} />
        <div className={styles.movingCircleWrapper}>
          {isMoving && (
            <span className={styles.percentageText}>
              {Math.round(waterLevel)}%
            </span>
          )}
          <div
            className={styles.movingCircle}
            style={{ left: `${waterLevel}%` }}
          />
        </div>
      </div>
      <div className={styles.marks}>
        <span className={styles.mark}>0%</span>
        <span className={styles.mark}>50%</span>
        <span className={styles.mark}>100%</span>
      </div>
    </div>
  );
};

export default WaterProgressBar;
