import { useState } from "react";
import { useDispatch } from "react-redux";
import css from "./DeleteWaterModal.module.css";
import Modal from "../Modal/Modal";
import { deleteWaterOperation } from "../../redux/water/operations";
import { setRefresh } from "../../redux/water/slice";

const DeleteWaterModal = ({ isOpen, onClose, id }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await dispatch(deleteWaterOperation(id)).unwrap();
      onClose();
      dispatch(setRefresh(true));
    } catch {
      setError("Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.modalContent}>
        <h2 className={css.titleDelete}>Delete entry</h2>
        <p className={css.textDelete}>
          Are you sure you want to delete the entry?
        </p>
        {error && <p className={css.errorMessage}>{error}</p>}
        <div className={css.boxForBtn}>
          <button
            type="button"
            className={css.btnDelete}
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
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
