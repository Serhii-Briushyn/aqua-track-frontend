import { motion } from "framer-motion";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DocumentTitle from "../../components/DocumentTitle";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import { fadeInScale } from "../../motion/motion.js";
import { selectUser } from "../../redux/auth/selectors.js";
import { selectRefresh } from "../../redux/water/selectors.js";
import {
  getDailyWaterOperation,
  getMonthlyWaterOperation,
} from "../../redux/water/operations.js";
import { fetchUserDetails } from "../../redux/auth/operations.js";
import { setRefresh } from "../../redux/water/slice.js";

export default function TrackerPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const refresh = useSelector(selectRefresh);

  const fetchWaterData = useCallback(
    (date) => {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      dispatch(getDailyWaterOperation({ date }));
      dispatch(getMonthlyWaterOperation({ month, year }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserDetails());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      const today = new Date().toISOString().split("T")[0];
      fetchWaterData(today);
    }
  }, [user, fetchWaterData]);

  useEffect(() => {
    if (refresh && user) {
      const today = new Date().toISOString().split("T")[0];
      fetchWaterData(today);
      dispatch(setRefresh(false));
    }
  }, [refresh, user, fetchWaterData, dispatch]);

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
