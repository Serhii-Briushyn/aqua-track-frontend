// import { useEffect } from "react";
import { motion } from "framer-motion";

import DocumentTitle from "../../components/DocumentTitle";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import { fadeInScale } from "../../motion/motion.js";
// import { startTokenRefreshInterval } from "../../utils/tokenRefresh";

export default function TrackerPage() {
  // useEffect(() => {
  //   startTokenRefreshInterval();
  // }, []);

  return (
    <>
      <DocumentTitle>AquaTrack</DocumentTitle>

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
    </>
  );
}
