import WaterModal from "../WaterModal/WaterModal"
import css from "./AddWaterBtn.module.css"
import { GoPlus } from "react-icons/go";

const AddWaterBtn = () => {
  return (
    <div className={css.addWaterBtn}>
      <button
          role="button"
          onClick={() => {}}
          className={css.btn}>
          <div className={css.iconPlus}><GoPlus/></div>
          <span className={css.btnTxt}>Add Water</span>
      </button>
      {/*<WaterModal/>*/}
    </div>
  )
}

export default AddWaterBtn