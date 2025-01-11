// import Modal from "../Modal/Modal";
// import WaterForm from "../WaterForm/WaterForm";
// import css from "./WaterModal.module.css";

// const WaterModal = ({ isOpen, onClose, source }) => {
//   const getTitle = () => {
//     if (source === "AddWater") return "Add water";
//     if (source === "EditWater") return "Edit the entered amount of water";
//     return "Default Title";
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} className={css.wrapper}>
//       <h2 className={css.title}>{getTitle()}</h2>
//       <WaterForm isOpen={isOpen} onClose={onClose} />
//     </Modal>
//   );
// };

// export default WaterModal;

import { useTranslation } from "react-i18next";
import css from "./WaterModal.module.css";
import WaterForm from "../WaterForm/WaterForm";
import { ANIMATION } from "../../constants.js";
import svgSprite from "../../assets/icons/icons2.svg";

const WaterModal = ({
  operationType,
  onClose,
  water = {},
  timestampFromUrl = "",
}) => {
  // operationType: "add" | "edit", onClose: () => void, water: {id: 'string', amount: number, date: "string"}
  const { t } = useTranslation();

  const handleClose = () => {
    const id = setTimeout(() => {
      onClose();
      clearTimeout(id);
    }, ANIMATION.DURATION);
  };

  const modalHeader = (operationType) => {
    switch (operationType) {
      case "add":
        return t("addWaterTitle");
      case "edit":
        return t("editWaterAmount");
      default:
        return t("addWaterTitle");
    }
  };

  const curentTimestamp = Number(timestampFromUrl);
  const recordTimestamp = Number(water.date);

  const editTime = (operationType) => {
    switch (operationType) {
      case "add":
        return curentTimestamp;
      case "edit":
        return recordTimestamp;
    }
  };

  const waterPortion = (operationType) => {
    switch (operationType) {
      case "add":
        return 50;
      case "edit":
        return water.amount;
      default:
        return 50;
    }
  };

  const waterID = (operationType) => {
    switch (operationType) {
      case "add":
        return null;
      case "edit":
        return water.id;
      default:
        return null;
    }
  };

  return (
    <div className={css.WaterModal}>
      <h1>{modalHeader(operationType)}</h1>
      <WaterForm
        operationType={operationType}
        editTime={editTime(operationType)} // Передаємо мілісекунди
        waterPortion={waterPortion(operationType)} // Передаємо порцію води
        waterID={waterID(operationType)} // Передаємо ID води
        handleClose={handleClose}
      />
      <button
        type="button"
        onClick={handleClose}
        aria-label={t("closeWaterModal")}
        className={css.WaterModalCloseBtn}
      >
        <svg>
          <use xlinkHref={svgSprite + "#icon-clear"}></use>
        </svg>
      </button>
    </div>
  );
};

export default WaterModal;
