import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";
import WaterModal from "../WaterModal/WaterModal";
import css from "./WaterItem.module.css";
import icons from "../../assets/icons/icons.svg";
const WaterItem = () => {
  return (
    <div className={css.waterItem}>
      <svg width="45" height="45">
        <use href={`${icons}#icon-glass`} />
      </svg>

      <div className={css.indicators}>
        <span className={css.volume}>250 ml</span>
        <span className={css.time}>11:00 AM</span>
      </div>
      <div className={css.actions}>
        <button role="button">
          <svg width="16" height="16">
            <use href={`${icons}#icon-edit`} />
          </svg>
        </button>
        <button role="button">
          <svg width="16" height="16">
            <use href={`${icons}#icon-delete`} />
          </svg>
        </button>
      </div>
      {/*<WaterModal />*/}
      {/*<DeleteWaterModal/>*/}
    </div>
  );
};

export default WaterItem;
