import { useState } from "react";
import s from "./WaterModal.module.css";
const WaterModal = () => {
  const [amount, setAmount] = useState(50);

  const handleDecrease = () => {
    if (amount > 0) {
      setAmount(amount - 10);
    }
  };

  const handleIncrease = () => {
    setAmount(amount + 10);
  };
  return (
    <div className={s.modal}>
      <span className={s.close} onClick={() => console.log("Close modal")}>
        ×
      </span>
      <h2>Add water</h2>

      <div className={s.field}>
        <label>Choose a value:</label>
        <div className={s.amountControls}>
          <button onClick={handleDecrease}>-</button>
          <span>{amount} ml</span>
          <button onClick={handleIncrease}>+</button>
        </div>
      </div>

      <div className={s.field}>
        <label>Recording time:</label>
        <input type="text" value="17:42" readOnly />
      </div>

      <div className={s.field}>
        <label>Enter the value of the water used:</label>
        <input type="text" value={amount} readOnly />
      </div>

      <button className={s.save} onClick={() => console.log("Save data")}>
        Save
      </button>
    </div>
  );
};

export default WaterModal;
