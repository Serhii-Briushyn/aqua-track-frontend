import { useTranslation } from "react-i18next";

import Modal from "../Modal/Modal";
import EditWaterForm from "../EditWaterForm/EditWaterForm";
import AddWaterForm from "../AddWaterForm/AddWaterForm";

import css from "./WaterModal.module.css";

const WaterModal = ({ isOpen, onClose, source }) => {
  const { t } = useTranslation();

  const getTitle = () => {
    if (source === "AddWater") return t("addWater");
    if (source === "EditWater") return t("editWater");
  };

  const renderForm = () => {
    if (source === "AddWater") {
      return <AddWaterForm onClose={onClose} />;
    }
    if (source === "EditWater") {
      return <EditWaterForm onClose={onClose} />;
    }
    return null;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.wrapper}>
        <h2 className={css.title}>{getTitle()}</h2>
        {renderForm()}
      </div>
    </Modal>
  );
};

export default WaterModal;
