/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import styles from "./WaterProgressBar.module.css";
import { useEffect, useState } from "react";
import {
  selectSelectedDate,
  selectTotalPercentage,
} from "../../redux/water/selectors";
import { useTranslation } from "react-i18next";

const WaterProgressBar = () => {
  const totalPercentage = useSelector(selectTotalPercentage);
  const selectedDate = useSelector(selectSelectedDate);
  const [waterLevel, setWaterLevel] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const boundedProgress = Math.min(totalPercentage, 100);
    setWaterLevel(boundedProgress);
  }, [totalPercentage]);

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
    const month = new Intl.DateTimeFormat(i18n.language, {
      month: "long",
    }).format(inputDate);

    return `${day}, ${month}`;
  };

  const handleCircleMove = () => {
    setIsMoving(true);
    setTimeout(() => {
      setIsMoving(false);
    }, 2500);
  };

  useEffect(() => {
    handleCircleMove();
  }, [waterLevel]);

  useEffect(() => {
    setFormattedDate(getHeaderTitle());
  }, [selectedDate, totalPercentage, t, i18n.language]);

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
