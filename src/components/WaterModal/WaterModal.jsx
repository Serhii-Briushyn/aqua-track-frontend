import Modal from "../Modal/Modal";
import WaterForm from "../WaterForm/WaterForm";
import css from "./WaterModal.module.css";
import { useTranslation } from "react-i18next";

const WaterModal = ({
  isOpen,
  onClose,
  source,
  modalData,
  onValid,
  onSubmitSuccess,
}) => {
  const { t } = useTranslation();
  const handleSubmit = (data) => {
    if (onValid) {
      onValid(data);
    }
  };

  const getTitle = () => {
    if (source === "AddWater") return t("addWater");
    if (source === "EditWater") return t("editWaterAmount");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} type="addWater">
      <div className={css.wrapper}>
        <h2 className={css.title}>{getTitle()}</h2>
        <WaterForm
          onSubmit={handleSubmit}
          source={source}
          isOpen={isOpen}
          onClose={onClose}
          onSubmitSuccess={onSubmitSuccess}
          modalData={modalData}
        />
      </div>
    </Modal>
  );
};

export default WaterModal;
