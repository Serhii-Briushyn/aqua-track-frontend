// WaterMainInfo.jsx component

import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import s from "./WaterMainInfo.module.css";

import bottleImageMobile from "../../assets/images/bottle-image-mob-min.png";
import bottleImageTablet from "../../assets/images/bottle-image-tab-min.png";
import bottleImageDesktop from "../../assets/images/bottle-image-desk-min.png";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectDailyData } from "../../redux/water/selectors.js";
const getImageSource = () => {
  if (window.innerWidth >= 1440) {
    return bottleImageDesktop;
  } else if (window.innerWidth >= 768) {
    return bottleImageTablet;
  } else {
    return bottleImageMobile;
  }
};

const WaterMainInfo = ({ payload }) => {
  const [imageSource, setImageSource] = useState(getImageSource());
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const amount = useSelector(selectDailyData);
  const norm = useSelector(selectDailyData);
  const waterData = amount * 1000;
  const date = payload?.date || new Date();
=======
  const consumed = useSelector(selectDailyData);
  const waterData = consumed * 1000;
>>>>>>> Stashed changes
=======
  const consumed = useSelector(selectDailyData);
  const waterData = consumed * 1000;
>>>>>>> Stashed changes

  useEffect(() => {
    const handleSize = () => {
      setImageSource(getImageSource());
    };

    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  return (
    <div className={s.water_main_info}>
      <img src={imageSource} alt="water-icon" className={s.water_icon} />
      <WaterDailyNorma />
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      <WaterProgressBar consumed={waterData} dailyNorma={norm} date={date} />
=======
      <WaterProgressBar consumed={waterData} date="2025-01-11" />
>>>>>>> Stashed changes
=======
      <WaterProgressBar consumed={waterData} date="2025-01-11" />
>>>>>>> Stashed changes
      <AddWaterBtn />
    </div>
  );
};
export default WaterMainInfo;
