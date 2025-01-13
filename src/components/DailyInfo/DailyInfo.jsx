import AddWaterBtn from "./AddWaterBtn/AddWaterBtn.jsx";
import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";
const DailyInfo = () => {
  return (
    <div>
      <div className={css.infoHeader}>
        <h2 className={css.h2}>Today</h2>
        <AddWaterBtn />
      </div>
      <WaterList />
      {/*<ChooseDate />*/}
    </div>
  );
};

export default DailyInfo;
