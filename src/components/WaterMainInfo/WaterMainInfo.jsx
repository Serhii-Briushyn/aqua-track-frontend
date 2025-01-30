import { useState, useEffect } from "react";

import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";

import bottleImageMobile from "../../assets/images/bottle-image-mob-min.png";
import bottleImageTablet from "../../assets/images/bottle-image-tab-min.png";
import bottleImageDesktop from "../../assets/images/bottle-image-desk-min.png";

import css from "./WaterMainInfo.module.css";

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
    <div className={css.water_main_info}>
      <img src={imageSource} alt="water-icon" className={css.water_icon} />
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn type="waterMain" />
      <LanguageSwitcher />
    </div>
  );
};
export default WaterMainInfo;
