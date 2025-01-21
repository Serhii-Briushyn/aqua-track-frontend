import DailyInfo from "../DailyInfo/DailyInfo";
import MonthInfo from "../MonthInfo/MonthInfo";
import UserPanel from "../UserPanel/UserPanel";
import css from "./WaterDetailedInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getDailyWaterOperation,
  getMonthlyWaterOperation,
} from "../../redux/water/operations.js";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  selectIsLoading as selectAuthIsLoading,
  selectUser,
} from "../../redux/auth/selectors.js";
import {
  selectDailyData,
  selectMonthlyData,
  selectSelectedDate,
  selectIsLoading as selectWaterIsLoading,
} from "../../redux/water/selectors.js";
import { formatToDateString } from "./utils/index.js";
import { fetchUserDetails } from "../../redux/auth/operations.js";
import { setSelectedDate } from "../../redux/water/slice.js";

const WaterDetailedInfo = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const isUserLoading = useSelector(selectAuthIsLoading);
  const dailyData = useSelector(selectDailyData) || [];
  const monthlyData = useSelector(selectMonthlyData) || [];
  const isDataLoading = useSelector(selectWaterIsLoading);
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
    <div className={css.waterDetailedInfo}>
      {!isUserLoading && <UserPanel user={user} />}
      <DailyInfo
        isLoading={isDataLoading}
        dailyData={dailyData}
        selectedDate={new Date(selectedDate)}
        onSubmitSuccess={onSubmitSuccess}
      />
      <MonthInfo
        monthlyData={monthlyData}
        selectedDate={new Date(selectedDate)}
        currentMonth={currentMonth}
        onChangeMonth={onChangeMonth}
        onChangeDate={onChangeDate}
      />
    </div>
  );
};

export default WaterDetailedInfo;
