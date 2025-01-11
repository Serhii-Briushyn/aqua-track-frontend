import  WaterForm  from "../WaterForm/WaterForm";
import css from "./WaterModal.module.css";

const WaterModal = ({ title, subtitle, onClose, toggleHandle, water }) => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>{title}</h2>
      <WaterForm
        subtitle={subtitle}
        onClose={onClose}
        toggleHandle={toggleHandle}
        water={water}
      />
    </div>
  );
};

export default WaterModal;
