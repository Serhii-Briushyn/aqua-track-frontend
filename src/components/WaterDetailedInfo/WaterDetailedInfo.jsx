import DailyInfo from "../DailyInfo/DailyInfo";
import MonthInfo from "../MonthInfo/MonthInfo";
import UserPanel from "../UserPanel/UserPanel";
import css from "./WaterDetailedInfo.module.css";

const WaterDetailedInfo = () => {
  return (
    <div className={css.waterDetailedInfo}>
      <UserPanel />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      {/*<DailyInfo />*/}
      {/*<MonthInfo />*/}
    </div>
  );
};

export default WaterDetailedInfo;
