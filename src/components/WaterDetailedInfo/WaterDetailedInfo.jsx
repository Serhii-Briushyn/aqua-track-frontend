import DailyInfo from "../DailyInfo/DailyInfo";
import MonthInfo from "../MonthInfo/MonthInfo";
import UserPanel from "../UserPanel/UserPanel";
import css from "./WaterDetailedInfo.module.css";
import {useSelector} from "react-redux";
import {selectIsLoading as selectAuthIsLoading, selectUser} from "../../redux/auth/selectors.js";
import {
  selectDailyData,
  selectMonthlyData,
  selectSelectedDate
} from "../../redux/water/selectors.js";

const WaterDetailedInfo = (props) => {
  const {
    onSubmitSuccess,
    currentMonth,
    onChangeMonth,
    onChangeDate,
  } = props

  const user = useSelector(selectUser);
  const isUserLoading = useSelector(selectAuthIsLoading);
  const selectedDate = useSelector(selectSelectedDate);
  const dailyData = useSelector(selectDailyData) || [];
  const monthlyData = useSelector(selectMonthlyData) || [];

  return (
    <div className={css.waterDetailedInfo}>
      {!isUserLoading && <UserPanel user={user} />}
      <DailyInfo
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
