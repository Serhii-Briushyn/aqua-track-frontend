import DailyInfo from "../DailyInfo/DailyInfo";
import MonthInfo from "../MonthInfo/MonthInfo";
import UserPanel from "../UserPanel/UserPanel";
import css from "./WaterDetailedInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDailyWaterOperation, getMonthlyWaterOperation } from "../../redux/water/operations.js";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  selectIsLoading as selectAuthIsLoading,
  selectUser
} from "../../redux/auth/selectors.js";
import {
  selectDailyData,
  selectMonthlyData,
  selectIsLoading as selectWaterIsLoading
} from "../../redux/water/selectors.js";
import { formatToDateString } from "./utils/index.js";

const WaterDetailedInfo = () => {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const user = useSelector(selectUser);
  const isUserLoading = useSelector(selectAuthIsLoading);
  const dailyData = useSelector(selectDailyData) || [];
  const monthlyData = useSelector(selectMonthlyData) || [];
  const isDataLoading = useSelector(selectWaterIsLoading);

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

    setSelectedDate(
      isCurrentMonth
        ? today
        : new Date(newDate.getFullYear(), newDate.getMonth(), 1)
    );
  };

  const onChangeDate = (date) => {
    const newSelectedDate = new Date(date);
    setSelectedDate(newSelectedDate);
  };

  const onAddWaterSubmitSuccess = () => {
    fetchDaily(formattedSelectedDate)
    fetchMonthly()
  }

  useEffect(() => {
    fetchMonthly();
  }, [fetchMonthly]);

  useEffect(() => {
    fetchDaily(formattedSelectedDate);
  }, [formattedSelectedDate, fetchDaily]);

  return (
    <div className={css.waterDetailedInfo}>
      {!isUserLoading && <UserPanel user={user} />}
      <DailyInfo
        isLoading={isDataLoading}
        dailyData={dailyData}
        selectedDate={selectedDate}
        onAddWaterSubmitSuccess={onAddWaterSubmitSuccess}
      />
      <MonthInfo
        monthlyData={monthlyData}
        selectedDate={selectedDate}
        currentMonth={currentMonth}
        onChangeMonth={onChangeMonth}
        onChangeDate={onChangeDate}
      />
    </div>
  );
};

export default WaterDetailedInfo;
