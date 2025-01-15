import Modal from "../Modal/Modal";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";

import css from "./UserSettingsModal.module.css";

const UserSettingsModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} type="userSettings">
      <div className={css.wrapper}>
        <h2 className={css.title}>Setting</h2>
        <UserSettingsForm isOpen={isOpen} onClose={onClose} />
      </div>
    </Modal>
  );
};

export default UserSettingsModal;
