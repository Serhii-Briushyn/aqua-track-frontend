import { useState, useEffect } from "react";
import { useTour } from "@reactour/tour";
import { SlInfo } from "react-icons/sl";

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
  const { setIsOpen, setCurrentStep } = useTour();

  useEffect(() => {
    const handleSize = () => {
      setImageSource(getImageSource());
    };

    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  const startTour = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length || mutation.removedNodes.length) {
          const isTourActive = document.querySelector(".reactour__mask");
          if (isTourActive) {
            document.body.classList.add("no-scroll");
          } else {
            document.body.classList.remove("no-scroll");
          }
        }
      });
    });

    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    observer.observe(targetNode, config);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={css.water_main_info}>
      <img src={imageSource} alt="water-icon" className={css.water_icon} />
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn type="waterMain" />
      <LanguageSwitcher />
      <button className={css.button} onClick={startTour}>
        <SlInfo className={css.icon} />
      </button>
    </div>
  );
};
export default WaterMainInfo;
