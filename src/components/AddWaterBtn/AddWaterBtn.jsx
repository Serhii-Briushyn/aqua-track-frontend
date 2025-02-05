import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import WaterModal from "../WaterModal/WaterModal";

import { selectCurrentDate } from "../../redux/water/selectors";

import icons from "../../assets/icons/icons.svg";

import css from "./AddWaterBtn.module.css";

const AddWaterBtn = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const currentDate = useSelector(selectCurrentDate);
  const today = new Date().toISOString().split("T")[0];

  const isDisabled = currentDate > today;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const buttonClass = `${
    type === "waterMain" ? css.waterMainButton : css.waterDetailButton
  }`;

  const iconClass = `${
    type === "waterMain" ? css.waterMainIcon : css.waterDetailIcon
  }`;

  return (
    <div>
      <button
        className={buttonClass}
        data-tour={type === "waterMain" ? "add-water-btn" : undefined}
        onClick={openModal}
        disabled={isDisabled}
        title={isDisabled ? t("disabledMessage") : ""}
      >
        <svg className={iconClass}>
          <use href={`${icons}#icon-plus`} />
        </svg>{" "}
        {t("addWater")}
      </button>
      <WaterModal isOpen={isModalOpen} onClose={closeModal} source="AddWater" />
    </div>
  );
};

export default AddWaterBtn;
