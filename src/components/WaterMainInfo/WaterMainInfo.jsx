import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import Logo from "../Logo/Logo";
import s from "./WaterMainInfo.module.css";

// Імпортуємо зображення
import bottleImageMobile from "../../assets/images/bottle-image-mob-min.png";
import bottleImageTablet from "../../assets/images/bottle-image-tab-min.png";
import bottleImageDesktop from "../../assets/images/bottle-image-desk@2x-min.png";

const WaterMainInfo = () => {
  return (
    <div className={s.water_main_info_container}>
      <div className={s.water_main_info}>
        <picture className={s.water_picture}>
          <source
            srcSet={`${bottleImageDesktop} 1x, ${bottleImageDesktop}@2x 2x`}
            media="(min-width: 1440px)"
          />
          <source
            srcSet={`${bottleImageTablet} 1x, ${bottleImageTablet}@2x 2x`}
            media="(min-width: 768px)"
          />
          <source
            srcSet={`${bottleImageMobile} 1x, ${bottleImageMobile}@2x 2x`}
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
        <WaterProgressBar />
        <AddWaterBtn />
      </div>
    </div>
  );
};

export default WaterMainInfo;
