import { FiEdit2, FiTrash } from "react-icons/fi";

import icons from "../../assets/icons/icons.svg";
import css from "./WaterItem.module.css";

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
          <FiEdit2 style={{ color: "#323F47" }} />
        </button>
        <button role="button">


          <FiTrash style={{ color: "#323F47" }} />

        </button>
      </div>

    </div>
  );
};

export default WaterItem;
