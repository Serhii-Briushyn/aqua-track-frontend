import css from "./DeleteWaterModal.module.css";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { deleteWater } from "../../redux/water/operations";

const DeleteWaterModal = ({ isOpen, onClose, id }) => {
  const dispatch = useDispatch();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.modalContent}>
        <h2 className={css.titleDelete}>Delete entry</h2>
        <p className={css.textDelete}>
          Are you sure you want to delete the entry?
        </p>
        <div className={css.boxForBtn}>
          <button
            type="button"
            className={css.btnDelete}
            onClick={() => dispatch(deleteWater(id))}
          >
            Delete
          </button>
          <button type="button" className={css.btnCancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWaterModal;
