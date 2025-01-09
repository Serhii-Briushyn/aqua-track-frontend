import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import Logo from "../Logo/Logo";
import s from "./WaterMainInfo.module.css";

import bottleImageMobile from "../../assets/images/bottle-image-mob-min.png";
import bottleImageMobile2 from "../../assets/images/bottle-image-mob@2x-min.png";

import bottleImageTablet from "../../assets/images/bottle-image-tab-min.png";
import bottleImageTablet2 from "../../assets/images/bottle-image-tab@2x-min.png";

import bottleImageDesktop2 from "../../assets/images/bottle-image-desk@2x-min.png";
import bottleImageDesktop from "../../assets/images/bottle-image-desk-min.png";

const WaterMainInfo = () => {
  return (
    <div className={s.water_main_info}>
      <picture className={s.water_picture} alt="water-icon">
        <source
          srcSet={`${bottleImageDesktop} 1x, ${bottleImageDesktop2}@2x 2x`}
          media="(min-width: 1440px)"
        />
        <source
          srcSet={`${bottleImageTablet} 1x, ${bottleImageTablet2}@2x 2x`}
          media="(min-width: 768px)"
        />
        <source
          srcSet={`${bottleImageMobile} 1x, ${bottleImageMobile2}@2x 2x`}
          media="(max-width: 767px)"
        />
        <img
          src={bottleImageMobile}
          alt="water-icon"
          className={s.water_icon}
        />
      </picture>
      <Logo />
      <WaterDailyNorma />
      <WaterProgressBar consumed={1000} dailyGoal={1500} date="2025-01-12" />
      <AddWaterBtn />
    </div>
  );
};

export default WaterMainInfo;
