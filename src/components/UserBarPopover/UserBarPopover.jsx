import { useState } from "react";
import { FiSettings, FiLogOut } from "react-icons/fi";

import LogOutModal from "../LogOutModal/LogOutModal";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal";

import css from "./UserBarPopover.module.css";

const UserBarPopover = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className={css.userBarPopover}>
      <ul>
        <li>
          <button className={css.setting} onClick={() => {}}>
            <FiSettings />
            <span className={css.btnTxt}>Setting</span>
          </button>
        </li>
        <li>
          <button className={css.logout} onClick={() => openModal("LogOut")}>
            <FiLogOut />
            <span className={css.btnTxt}>Log out</span>
          </button>
        </li>
      </ul>
      {/*<UserSettingsModal />*/}
      {activeModal === "LogOut" && (
        <LogOutModal isOpen={true} onClose={closeModal} />
      )}
    </div>
  );
};

export default UserBarPopover;
