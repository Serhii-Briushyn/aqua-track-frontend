import { useState } from "react";
import { useDispatch } from "react-redux";
import css from "./DeleteWaterModal.module.css";
import Modal from "../Modal/Modal";
import { deleteWaterOperation } from "../../redux/water/operations";
import { useTranslation } from "react-i18next";

const DeleteWaterModal = ({ isOpen, onClose, id, onSubmitSuccess }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await dispatch(deleteWaterOperation(id)).unwrap();
      onClose();
      onSubmitSuccess?.();
    } catch {
      setError("Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.modalContent}>
        <h2 className={css.titleDelete}>{t("deleteEntry")}</h2>
        <p className={css.textDelete}>{t("confirmDeleteEntry")}</p>
        {error && <p className={css.errorMessage}>{error}</p>}
        <div className={css.boxForBtn}>
          <button
            type="button"
            className={css.btnDelete}
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? t("deleting") : t("delete")}
          </button>
          <button type="button" className={css.btnCancel} onClick={onClose}>
            {t("cancel")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWaterModal;
