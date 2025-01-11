import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
// import Logo from "../Logo/Logo";
import s from "./WaterMainInfo.module.css";

import bottleImageMobile from "../../assets/images/bottle-image-mob-min.png";
import bottleImageTablet from "../../assets/images/bottle-image-tab-min.png";
import bottleImageDesktop from "../../assets/images/bottle-image-desk-min.png";

import { useState, useEffect } from "react";

const getImageSource = () => {
  if (window.innerWidth >= 1440) {
    return bottleImageDesktop;
  } else if (window.innerWidth >= 768) {
    return bottleImageTablet;
  } else {
    return bottleImageMobile;
  }
};

const WaterMainInfo = () => {
  const [imageSource, setImageSource] = useState(getImageSource());

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
      <WaterProgressBar consumed={1000} dailyGoal={1500} date="2025-01-12" />
      <AddWaterBtn />
    </div>
  );
};
export default WaterMainInfo;
