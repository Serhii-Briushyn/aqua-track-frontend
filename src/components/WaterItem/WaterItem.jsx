import { FiEdit2, FiTrash } from "react-icons/fi";

import icons from "../../assets/icons/icons.svg";
import css from "./WaterItem.module.css";
import WaterModal from "../WaterModal/WaterModal";
import { useState } from "react";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";

const WaterItem = ({ item, onSubmitSuccess }) => {
  const { id, amount, date } = item;

  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleSave = () => {
    closeModal();
    if (onSubmitSuccess) onSubmitSuccess();
  };

  const localDate = new Date(date);
  const localTime = `${localDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${localDate.getMinutes().toString().padStart(2, "0")}`;

  return (
    <>
      <div className={css.waterItem}>
        <svg width="45" height="45">
          <use href={`${icons}#icon-glass`} />
        </svg>

        <div className={css.indicators}>
          <span className={css.volume}>{amount} ml</span>
          <span className={css.time}>{localTime}</span>
        </div>
        <div className={css.actions}>
          <button role="button" onClick={() => openModal("EditWater", id)}>
            <FiEdit2 style={{ color: "#323F47" }} />
          </button>
          <button role="button" onClick={() => openModal("DeleteWater", id)}>
            <FiTrash style={{ color: "#323F47" }} />
          </button>
        </div>
      </div>

      {activeModal === "EditWater" && (
        <WaterModal
          isOpen={true}
          onClose={closeModal}
          source="EditWater"
          modalData={item}
          onValid={handleSave}
          onSubmitSuccess={onSubmitSuccess}
        />
      )}

      {activeModal === "DeleteWater" && (
        <DeleteWaterModal
          isOpen={true}
          onClose={closeModal}
          id={id}
          onSubmitSuccess={onSubmitSuccess}
        />
      )}
    </>
  );
};

export default WaterItem;
