import { useState } from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import icons from "../../assets/icons/icons.svg";
import WaterModal from "../WaterModal/WaterModal";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";

import css from "./WaterItem.module.css";
import {isDateToday} from "../../utils/isDateToday.js";
import s from "../AddWaterBtn/AddWaterBtn.module.css";
import {useSelector} from "react-redux";
import {selectSelectedDate} from "../../redux/water/selectors.js";

const WaterItem = ({ item, onSubmitSuccess }) => {
  const { id, amount, date } = item;
  const { t } = useTranslation();
  const selectedDate = useSelector(selectSelectedDate)

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

  const formatTimeUTC = (dateString) => {
    const dateObject = new Date(dateString);
    const hours = dateObject.getUTCHours().toString().padStart(2, "0");
    const minutes = dateObject.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const time = formatTimeUTC(date);
  return (
    <>
      <div className={css.waterItem}>
        <svg width="45" height="45">
          <use href={`${icons}#icon-glass`} />
        </svg>

        <div className={css.indicators}>
          <span className={css.volume}>
            {amount} {t("ml")}
          </span>
          <span className={css.time}>{time}</span>
        </div>
        <div className={css.actions}>
          <button
            role="button"
            onClick={() => openModal("EditWater", id)}
            disabled={!isDateToday(selectedDate)}
            className={`${!isDateToday(selectedDate) ? css.buttonDisabled : ""}`}
          >
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
          modalData={{ ...item, time }}
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
