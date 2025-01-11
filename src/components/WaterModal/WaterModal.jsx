import Modal from "../Modal/Modal";
import WaterForm from "../WaterForm/WaterForm";
import css from "./WaterModal.module.css";

const WaterModal = ({ isOpen, onClose, source }) => {
  const getTitle = () => {
    if (source === "AddWater") return "Add water";
    if (source === "EditWater") return "Edit the entered amount of water";
    return "Default Title";
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={css.wrapper}>
      <h2 className={css.title}>{getTitle()}</h2>
      <WaterForm isOpen={isOpen} onClose={onClose} />
    </Modal>
  );
};

export default WaterModal;
