import Modal from "../Modal/Modal";
import WaterForm from "../WaterForm/WaterForm";
import css from "./WaterModal.module.css";

const WaterModal = ({ isOpen, onClose, source, modalData, onValid }) => {
  const handleSubmit = (data) => {
    if (onValid) {
      onValid(data);
    }
  };

  const getTitle = () => {
    if (source === "AddWater") return "Add water";
    if (source === "EditWater") return "Edit the entered amount of water";
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.wrapper}>
        <h2 className={css.title}>{getTitle()}</h2>
        <WaterForm
          onSubmit={handleSubmit}
          source={source}
          isOpen={isOpen}
          onClose={onClose}
          modalData={modalData}
        />
      </div>
    </Modal>
  );
};

export default WaterModal;


