import WaterModal from "../WaterModal/WaterModal";
import { useState } from "react";

import icons from "../../assets/icons/icons.svg";

import s from "./AddWaterBtn.module.css";
const AddWaterBtn = ({ type, selectedDate, onSubmitSuccess }) => {
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
      <button className={buttonClass} onClick={openModal}>
        <svg className={iconClass}>
          <use href={`${icons}#icon-plus`} />
        </svg>{" "}
        Add water
      </button>
      <WaterModal
        isOpen={isModalOpen}
        onClose={closeModal}
        source={modalSource}
        selectedDate={selectedDate}
        onSubmitSuccess={onSubmitSuccess}
      />
    </div>
  );
};

export default AddWaterBtn;
