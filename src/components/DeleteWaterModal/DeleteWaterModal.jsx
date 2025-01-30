import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import Modal from "../Modal/Modal";

import { deleteWaterOperation } from "../../redux/water/operations";
import { selectCurrentItem } from "../../redux/water/selectors";
import { triggerRefetch } from "../../redux/water/slice";

import css from "./DeleteWaterModal.module.css";


const DeleteWaterModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const currentItem = useSelector(selectCurrentItem);
  const [isDeleting, setIsDeleting] = useState(false);
  const { t } = useTranslation();

  const handleConfirm = async () => {
    if (currentItem) {
      setIsDeleting(true);
      try {
        await dispatch(deleteWaterOperation(currentItem)).unwrap();
        toast.success(t("successDelete"));
        dispatch(triggerRefetch());
        onClose();
      } catch (error) {
        toast.error(t(error));
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.modalContent}>
        <h2 className={css.titleDelete}>{t("deleteTitle")}</h2>
        <p className={css.textDelete}>{t("deleteConfirm")}</p>
        <div className={css.boxForBtn}>
          <button
            type="button"
            className={`${css.btnDelete} ${
              isDeleting ? css.disabled : ""
            }`}
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {t("deleteBtn")}
          </button>
          <button
            type="button"
            className={css.btnCancel}
            onClick={onClose}
            disabled={isDeleting}
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWaterModal;
