import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { logout } from "../../redux/auth/operations";
import Modal from "../Modal/Modal";

import css from "./LogOutModal.module.css";

const LogOutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.modalContent}>
        <h2 className={css.titleLogout}>{t("logout")}</h2>
        <p className={css.textLogout}>{t("massage")}</p>
        <div className={css.boxForBtn}>
          <button
            type="button"
            className={css.btnLogout}
            onClick={() => dispatch(logout())}
          >
            {t("logout")}
          </button>
          <button type="button" className={css.btnCancel} onClick={onClose}>
            {t("cancel")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
