import Modal from "../Modal/Modal";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";
import { useTranslation } from "react-i18next";

import css from "./UserSettingsModal.module.css";

const UserSettingsModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose} type="userSettings">
      <div className={css.wrapper}>
        <h2 className={css.title}>{t("settings")}</h2>
        <UserSettingsForm isOpen={isOpen} onClose={onClose} />
      </div>
    </Modal>
  );
};

export default UserSettingsModal;
