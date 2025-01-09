import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";
import WaterModal from "../WaterModal/WaterModal";
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
        {/*temp*/}

        <button role="button">
          <FiEdit2 style={{ color: "#323F47" }} />
        </button>
        <button role="button">
          {/*temp*/}

          <FiTrash style={{ color: "#323F47" }} />
          {/*<svg width="16" height="16">*/}
          {/*  <use href={`${icons}#icon-delete`} />*/}
          {/*</svg>*/}
        </button>
      </div>
      {/*<WaterModal />*/}
      {/*<DeleteWaterModal/>*/}
    </div>
  );
};

export default WaterItem;
