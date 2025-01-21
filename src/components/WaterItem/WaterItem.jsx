import { FiEdit2, FiTrash } from "react-icons/fi";

import icons from "../../assets/icons/icons.svg";
import css from "./WaterItem.module.css";
import WaterModal from "../WaterModal/WaterModal";
import { useState } from "react";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";

const WaterItem = ({ item }) => {
  const { id, amount, date } = item;

  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const serverDate = new Date(date);
  let hours = serverDate.getUTCHours(); 
  const minutes = serverDate.getUTCMinutes().toString().padStart(2, "0");
  const amPm = hours >= 12 ? "PM" : "AM"; 
  hours = hours % 12 || 12;

  const formattedTime = `${hours}:${minutes} ${amPm}`;

  return (
    <>
      <div className={css.waterItem}>
        <svg width="45" height="45">
          <use href={`${icons}#icon-glass`} />
        </svg>

        <div className={css.indicators}>
          <span className={css.volume}>{amount} ml</span>
          <span className={css.time}>{formattedTime}</span>
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
        />
      )}

      {activeModal === "DeleteWater" && (
        <DeleteWaterModal isOpen={true} onClose={closeModal} id={id} />
      )}
    </>
  );
};

export default WaterItem;
