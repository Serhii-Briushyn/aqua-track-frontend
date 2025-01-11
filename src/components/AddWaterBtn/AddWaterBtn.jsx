// AddWaterBtn.jsx

import WaterModal from "../WaterModal/WaterModal";
import { useState } from "react";

import s from "./AddWaterBtn.module.css";
const AddWaterBtn = () => {
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
  return (
    <div>
      <button className={s.button} onClick={openModal}>
        <svg className={s.icon}>
          <use href="/src/assets/icons/icons.svg#icon-plus-circle-black" />
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
