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
  const [formattedDate, setFormattedDate] = useState("");
  const [isMoving, setIsMoving] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    const boundedProgress = Math.min(totalPercentage, 100);
    setWaterLevel(boundedProgress);
    const today = new Date();
    const todayFormatted = today.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
    });

    const inputDate = new Date(selectedDate);
    const inputDateFormatted = inputDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
    });

    const [month, day] = inputDateFormatted.split(" ");
    const formatted = `${day.replace(",", "")}, ${month}`;

    if (inputDateFormatted === todayFormatted) {
      setFormattedDate(t("today"));
    } else {
      setFormattedDate(formatted);
    }
  }, [totalPercentage, selectedDate, t]);

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
              {Math.round(waterLevel.toFixed(1))}%
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
