// WaterProgressBar.jsx

import styles from "./WaterProgressBar.module.css";
import { useEffect, useState } from "react";

const WaterProgressBar = ({ consumed, waterDailyNorma, date }) => {
  const [waterLevel, setWaterLevel] = useState(0);
  const [formattedDate, setFormattedDate] = useState("");
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const progress = (consumed / waterDailyNorma) * 100;
    const boundedProgress = Math.min(progress, 100);
    setWaterLevel(boundedProgress);

    const today = new Date();
    const todayFormatted = today.toLocaleDateString(navigator.language, {
      day: "numeric",
      month: "long",
    });

    const inputDate = new Date(date);
    const inputDateFormatted = inputDate.toLocaleDateString(
      navigator.language,
      {
        day: "numeric",
        month: "long",
      }
    );

    if (inputDateFormatted === todayFormatted) {
      setFormattedDate("Today");
    } else {
      setFormattedDate(inputDate.toLocaleDateString(navigator.language));
    }
  }, [consumed, waterDailyNorma, date]);

  const handleCircleMove = () => {
    setIsMoving(true);
    setTimeout(() => {
      setIsMoving(false);
    }, 2000);
  };

  useEffect(() => {
    handleCircleMove();
  }, [waterLevel]);

  return (
    <div className={styles.swater_progress_bar_wrapper}>
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
