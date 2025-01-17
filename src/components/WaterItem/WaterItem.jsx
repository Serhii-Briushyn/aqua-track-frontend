import { FiEdit2, FiTrash } from "react-icons/fi";

import icons from "../../assets/icons/icons.svg";
import css from "./WaterItem.module.css";
import WaterModal from "../WaterModal/WaterModal";
import { useState } from "react";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";

const WaterItem = ({item, onSubmitSuccess}) => {

  const { id, amount, date } = item;

  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [waterData, setWaterData] = useState({
    volume: 250,
    time: "11:00",
    id: 1,
  });

  const openModal = (modalType, data = null) => {
    setActiveModal(modalType);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  const handleSave = (updatedData) => {
    setWaterData(updatedData);
    closeModal();
  };

  return (
    <>
      <div className={css.waterItem}>
        <svg width="45" height="45">
          <use href={`${icons}#icon-glass`} />
        </svg>

        <div className={css.indicators}>
          <span className={css.volume}>{amount} ml</span>
          <span className={css.time}>
            {String(new Date(date).getUTCHours()).padStart(2, '0')}
            :
            {String(new Date(date).getUTCMinutes()).padStart(2, '0')}
          </span>
        </div>
        <div className={css.actions}>
          <button
            role="button"
            onClick={() => openModal("EditWater", waterData)}
          >
            <FiEdit2 style={{ color: "#323F47" }} />
          </button>
          <button
            role="button"
            onClick={() => openModal("DeleteWater", waterData.id)}
          >
            <FiTrash style={{ color: "#323F47" }} />
          </button>
        </div>
      </div>

      {activeModal === "EditWater" && (
        <WaterModal
          isOpen={true}
          onClose={closeModal}
          source="EditWater"
          modalData={modalData}
          onValid={handleSave}
          onSubmitSuccess={onSubmitSuccess}
        />
      )}

      {activeModal === "DeleteWater" && (
        <DeleteWaterModal
          isOpen={true}
          onClose={closeModal} id={id}
          onSubmitSuccess={onSubmitSuccess}
        />
      )}
    </>
  );
};

export default WaterItem;
