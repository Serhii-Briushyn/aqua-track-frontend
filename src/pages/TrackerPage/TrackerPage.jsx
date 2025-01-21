import { motion } from "framer-motion";

import DocumentTitle from "../../components/DocumentTitle";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import { fadeInScale } from "../../motion/motion.js";
import {fetchUserDetails} from "../../redux/auth/operations.js";
import {useCallback, useEffect, useMemo, useState} from "react";
import {setSelectedDate} from "../../redux/water/slice.js";
import {getDailyWaterOperation, getMonthlyWaterOperation} from "../../redux/water/operations.js";
import {formatToDateString} from "../../components/WaterDetailedInfo/utils/index.js";
import {selectSelectedDate} from "../../redux/water/selectors.js";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../redux/auth/selectors.js";

export default function TrackerPage() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const selectedDate = useSelector(selectSelectedDate);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formattedSelectedDate = useMemo(
    () => formatToDateString(selectedDate),
    [selectedDate]
  );

  const fetchDaily = useCallback(
    (date) => {
      dispatch(getDailyWaterOperation({ date }));
    },
    [dispatch]
  );

  const fetchMonthly = useCallback(() => {
    const month = currentMonth.getMonth() + 1;
    const year = currentMonth.getFullYear();
    dispatch(getMonthlyWaterOperation({ month, year }));
  }, [currentMonth, dispatch]);

  const onChangeMonth = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newDate);

    const today = new Date();
    const isCurrentMonth =
      newDate.getMonth() === today.getMonth() &&
      newDate.getFullYear() === today.getFullYear();

    const newSelectedDate = isCurrentMonth
      ? today
      : new Date(newDate.getFullYear(), newDate.getMonth(), 1);

    dispatch(setSelectedDate(newSelectedDate.toISOString()));
  };

  const onChangeDate = (date) => {
    const newSelectedDate = new Date(date);
    dispatch(setSelectedDate(newSelectedDate.toISOString()));
  };

  const onSubmitSuccess = () => {
    fetchDaily(formattedSelectedDate);
    fetchMonthly();
  };

  useEffect(() => {
    if (user) fetchMonthly();
  }, [fetchMonthly, user]);

  useEffect(() => {
    if (user) fetchDaily(formattedSelectedDate);
  }, [formattedSelectedDate, fetchDaily, user]);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserDetails())
      onChangeDate(new Date())
    }
  }, [dispatch, user]);

  return (
    <>
      <DocumentTitle>AquaTrack</DocumentTitle>

      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeInScale()}
      >
        <WaterMainInfo onSubmitSuccess={onSubmitSuccess}/>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeInScale()}
      >
        <WaterDetailedInfo
          onSubmitSuccess={onSubmitSuccess}
          currentMonth={currentMonth}
          onChangeMonth={onChangeMonth}
          onChangeDate={onChangeDate}
        />
      </motion.div>
    </>
  );
}
