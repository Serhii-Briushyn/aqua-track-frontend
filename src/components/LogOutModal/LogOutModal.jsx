import css from "./LogOutModal.module.css";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";
const LogOutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.modalContent}>
        <h2 className={css.titleLogout}>{t("logout")}</h2>
        <p className={css.textLogout}>{t("confirmLogout")}</p>
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
