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
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";
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

  const amount = useSelector(selectDailyData);
  const norm = useSelector(selectDailyData);
  const waterData = amount * 1000;
  const date = payload?.date || new Date();
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
      <WaterProgressBar amount={waterData} norm={norm} date={date} />
      <AddWaterBtn type="waterMain" />
      <LanguageSwitcher />
    </div>
  );
};
export default WaterMainInfo;
