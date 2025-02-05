import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  selectCurrentDate,
  selectTotalPercentage,
} from "../../redux/water/selectors";

import { useTranslation } from "react-i18next";

import { getLocalizedDate } from "../../utils/dateLocalization";

import css from "./WaterProgressBar.module.css";

const WaterProgressBar = () => {
  const totalPercentage = useSelector(selectTotalPercentage);
  const currentDate = useSelector(selectCurrentDate);
  const [waterLevel, setWaterLevel] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const { t, i18n } = useTranslation();

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
    <div className={css.progressBarWrapper} data-tour="today-progress">
      <div className={css.todayLabel}>
        {getLocalizedDate(currentDate, i18n.language, t)}
      </div>
      <div className={css.waterProgressBar}>
        <div className={css.water} style={{ width: `${waterLevel}%` }} />
        <div className={css.movingCircleWrapper}>
          {isMoving && (
            <span className={css.percentageText}>
              {Math.round(waterLevel)}%
            </span>
          )}
          <div
            className={css.movingCircle}
            style={{ left: `${waterLevel}%` }}
          />
        </div>
      </div>
      <div className={css.marks}>
        <span className={css.mark}>0%</span>
        <span className={css.mark}>50%</span>
        <span className={css.mark}>100%</span>
      </div>
    </div>
  );
};

export default WaterProgressBar;
