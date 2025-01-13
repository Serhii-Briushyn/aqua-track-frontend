import WaterModal from "../../WaterModal/WaterModal";
import { useState } from "react";

import icons from "../../../assets/icons/icons.svg";
import css from "./AddWaterBtn.module.css";

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
    <div className={css.addWaterBtn}>
      <button role="button" onClick={openModal} className={css.btn}>
        <svg width="30" height="30">
          <use href={`${icons}#icon-plus-circle-green`}/>
        </svg>
        <span className={css.btnTxt}>Add Water</span>
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
