// AddWaterBtn.jsx

import WaterModal from "../WaterModal/WaterModal";
import { useState } from "react";

import icons from "../../assets/icons/icons.svg";

import s from "./AddWaterBtn.module.css";
const AddWaterBtn = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("");

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
      <button className={buttonClass} onClick={openModal} data-tour="step-4">
        <svg className={iconClass}>
          <use href={`${icons}#icon-plus`} />
        </svg>{" "}
        Add water
      </button>
      <WaterModal
        isOpen={isModalOpen}
        onClose={closeModal}
        source={modalSource}
      />
    </div>
  );
};

export default AddWaterBtn;
