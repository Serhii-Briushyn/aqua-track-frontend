import WaterModal from "../WaterModal/WaterModal";
import { useState } from "react";

import s from "./AddWaterBtn.module.css";
const AddWaterBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <button className={s.button} onClick={openModal}>
        <svg className={s.icon}>
          <use href="/src/assets/icons/icons.svg#icon-plus-circle-black" />
        </svg>{" "}
        Add water
      </button>
      {isModalOpen && <WaterModal onClose={closeModal} />}
    </div>
  );
};

export default AddWaterBtn;
