import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import WaterModal from "../WaterModal/WaterModal";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";

import { clearCurrentItem, setCurrentItem } from "../../redux/water/slice.js";

import { formatTimeUTC } from "../../utils/formatTime.js";
import { formatAmount } from "../../utils/formatAmount.js";

import icons from "../../assets/icons/icons.svg";

import css from "./WaterItem.module.css";

const WaterItem = ({ item }) => {
  const dispatch = useDispatch();
  const [activeModal, setActiveModal] = useState(null);
  const { t } = useTranslation();

  const amount = formatAmount(item.amount, t);
  const time = formatTimeUTC(item.date);

  const handleEdit = () => {
    dispatch(setCurrentItem(item));
    setActiveModal("EditWater");
  };

  const cancelEdit = () => {
    dispatch(clearCurrentItem());
    setActiveModal(null);
  };

  const handleDelete = () => {
    dispatch(setCurrentItem(item.id));
    setActiveModal("DeleteWater");
  };

  const cancelDelete = () => {
    dispatch(clearCurrentItem());
    setActiveModal(null);
  };

  return (
    <>
      <div className={css.waterItem}>
        <svg className={css.iconColor}>
          <use href={`${icons}#icon-glass`} />
        </svg>

        <div className={css.indicators}>
          <span className={css.volume}>{amount}</span>
          <span className={css.time}>{time}</span>
        </div>
        <div className={css.actions}>
          <button className={css.button} role="button" onClick={handleEdit}>
            <svg className={css.icon}>
              <use href={`${icons}#icon-edit`} />
            </svg>
          </button>
          <button className={css.button} role="button" onClick={handleDelete}>
            <svg className={css.icon}>
              <use href={`${icons}#icon-delete`} />
            </svg>
          </button>
        </div>
      </div>

      {activeModal === "EditWater" && (
        <WaterModal isOpen={true} onClose={cancelEdit} source="EditWater" />
      )}

      {activeModal === "DeleteWater" && (
        <DeleteWaterModal isOpen={true} onClose={cancelDelete} />
      )}
    </>
  );
};

export default WaterItem;
