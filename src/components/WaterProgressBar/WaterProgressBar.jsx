import styles from "./WaterProgressBar.module.css";
import { useEffect, useState } from "react";

const WaterProgressBar = ({ consumed, dailyGoal, date }) => {
  const [waterLevel, setWaterLevel] = useState(0);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const progress = (consumed / dailyGoal) * 100;
    setWaterLevel(progress);

    const today = new Date();
    const todayFormatted = today.toLocaleDateString(navigator.language);
    const inputDate = new Date(date);
    const inputDateFormatted = inputDate.toLocaleDateString(navigator.language);

    if (inputDateFormatted === todayFormatted) {
      setFormattedDate("Today");
    } else {
      setFormattedDate(inputDate.getDate());
    }
  }, [consumed, dailyGoal, date]);
  return (
    <div className={styles.swater_progress_bar_wrapper}>
      <div className={styles.todayLabel}>{formattedDate}</div>
      <div className={styles.waterProgressBar}>
        <div className={styles.water} style={{ width: `${waterLevel}%` }} />
        <div
          className={styles.movingCircle}
          style={{ left: `${waterLevel}%` }}
        />
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
