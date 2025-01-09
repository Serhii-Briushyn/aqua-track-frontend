import WaterModal from "../WaterModal/WaterModal";
import css from "./AddWaterBtn.module.css";
import icons from "../../assets/icons/icons.svg";

const AddWaterBtn = () => {
  return (
    <div className={css.addWaterBtn}>
      <button role="button" onClick={() => {}} className={css.btn}>
        <svg width="30" height="30">
          <use href={`${icons}#icon-plus-circle-green`} />
        </svg>
        <span className={css.btnTxt}>Add Water</span>
      </button>
      {/*<WaterModal/>*/}
    </div>
  );
};

export default AddWaterBtn;
