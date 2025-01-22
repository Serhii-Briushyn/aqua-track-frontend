import WaterModal from "../WaterModal/WaterModal";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import icons from "../../assets/icons/icons.svg";

import s from "./AddWaterBtn.module.css";
import {useSelector} from "react-redux";
import {selectSelectedDate} from "../../redux/water/selectors.js";
import {isDateToday} from "../../utils/isDateToday.js";
const AddWaterBtn = ({ type, onSubmitSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("");
  const { t } = useTranslation();

  const date = useSelector(selectSelectedDate)

  const openModal = () => {
    setModalSource("AddWater");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalSource("");
  };

  const buttonClass = `${
    type === "waterMain" ? s.waterMainButton : s.waterDetailButton
  }`;

  const iconClass = `${
    type === "waterMain" ? s.waterMainIcon : s.waterDetailIcon
  }`;

  return (
    <div>
      <button
        className={`${buttonClass} ${!isDateToday(date) ? s.buttonDisabled : ""}`}
        onClick={openModal}
        disabled={!isDateToday(date)}
      >
        <svg className={iconClass}>
          <use href={`${icons}#icon-plus`} />
        </svg>{" "}
        {t("addWater")}
      </button>
      <WaterModal
        isOpen={isModalOpen}
        onClose={closeModal}
        source={modalSource}
        onSubmitSuccess={onSubmitSuccess}
      />
    </div>
  );
};

export default AddWaterBtn;
