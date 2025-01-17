import { useEffect } from "react";
import { motion } from "framer-motion";

import DocumentTitle from "../../components/DocumentTitle";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import { fadeInScale } from "../../motion/motion.js";
// import { startTokenRefreshInterval } from "../../utils/tokenRefresh";
import { useTour } from "@reactour/tour";
import s from "./TrackerPage.module.css";
import icons from "../../assets/icons/icons.svg";

export default function TrackerPage() {
  // useEffect(() => {
  //   startTokenRefreshInterval();
  // }, []);

  const { setIsOpen } = useTour();

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("firstVisit") !== "true";
    if (isFirstVisit) {
      localStorage.setItem("firstVisit", "true");
      setIsOpen(true);
    }
  }, [setIsOpen]);

  return (
    <>
      <DocumentTitle>AquaTrack</DocumentTitle>

      <div className={s.wrapperStyle}>
        <div className={s.wrapperElement}>
          <button className={s.btnInfo} onClick={() => setIsOpen(true)}>
            <svg
              width="18"
              height="18"
              aria-hidden="true"
              focusable="false"
              className={s.iconInfo}
            >
              <use xlinkHref={`${icons}#icon-circle`} />
            </svg>
          </button>
        </div>
        <div className={s.wrapperTracker} data-tour="step-1">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInScale()}
          >
            <WaterMainInfo />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInScale()}
          >
            <WaterDetailedInfo />
          </motion.div>
        </div>
      </div>
    </>
  );
}
