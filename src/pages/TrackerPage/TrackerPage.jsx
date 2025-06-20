import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TourProvider } from "@reactour/tour";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import DocumentTitle from "../../components/DocumentTitle";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";

import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";
import {
  selectCurrentDate,
  selectCurrentMonth,
  selectCurrentWeek,
  selectRefetchTrigger,
} from "../../redux/water/selectors.js";
import {
  getDailyWaterOperation,
  getMonthlyWaterOperation,
  getWeeklyWaterOperation,
} from "../../redux/water/operations.js";
import { fetchUserDetails } from "../../redux/auth/operations.js";

import { steps } from "../../onboarding/Steps.jsx";

import { fadeInScale } from "../../motion/motion.js";

export default function TrackerPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentDate = useSelector(selectCurrentDate);
  const currentMonth = useSelector(selectCurrentMonth);
  const currentWeek = useSelector(selectCurrentWeek);
  const refetchTrigger = useSelector(selectRefetchTrigger);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (isLoggedIn && !user) {
          await dispatch(fetchUserDetails()).unwrap();
        }
      } catch {
        toast.error(t("fetchError"));
      }
    };

    fetchUser();
  }, [isLoggedIn, user, dispatch, t]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchDailyWater = async () => {
      try {
        await dispatch(getDailyWaterOperation({ date: currentDate })).unwrap();
      } catch {
        toast.error(t("fetchError"));
      }
    };

    fetchDailyWater();
  }, [isLoggedIn, currentDate, refetchTrigger, dispatch, t]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchMonthlyWater = async () => {
      try {
        await dispatch(
          getMonthlyWaterOperation({
            month: currentMonth.month + 1,
            year: currentMonth.year,
          })
        ).unwrap();
      } catch {
        toast.error(t("fetchError"));
      }
    };

    fetchMonthlyWater();
  }, [isLoggedIn, currentMonth, refetchTrigger, dispatch, t]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchWeeklyWater = async () => {
      try {
        await dispatch(
          getWeeklyWaterOperation({
            startDate: currentWeek.startDate.split("T")[0],
          })
        ).unwrap();
      } catch {
        toast.error(t("fetchError"));
      }
    };

    fetchWeeklyWater();
  }, [isLoggedIn, currentWeek, refetchTrigger, dispatch, t]);

  return (
    <>
      <DocumentTitle>AquaTrack</DocumentTitle>
      <TourProvider steps={steps(t)}>
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
      </TourProvider>
    </>
  );
}
