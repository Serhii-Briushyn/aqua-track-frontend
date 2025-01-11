import WaterItem from "../WaterItem/WaterItem";
import css from "./WaterList.module.css";

const WaterList = () => {
  return (
    <div className={css.waterList}>
      <div className={css.waterItemsList}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className={css.scrollableItemContainer}>
            <WaterItem index={index} key={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaterList;
