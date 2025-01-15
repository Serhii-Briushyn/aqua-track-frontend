import { useState } from "react";
import { FiSettings, FiLogOut } from "react-icons/fi";

import LogOutModal from "../LogOutModal/LogOutModal";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal";

import css from "./UserBarPopover.module.css";

const UserBarPopover = () => {
  const [modalsState, setModalsState] = useState({
    isSettingsModalOpen: false,
    isLogOutModalOpen: false,
  });

  const toggleModal = (modalName) => {
    setModalsState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  return (
    <div className={css.userBarPopover}>
      <ul>
        <li>
          <button
            className={css.setting}
            onClick={() => toggleModal("isSettingsModalOpen")}
          >
            <FiSettings />
            <span className={css.btnTxt}>Setting</span>
          </button>
        </li>
        <li>
          <button
            className={css.logout}
            onClick={() => toggleModal("isLogOutModalOpen")}
          >
            <FiLogOut />
            <span className={css.btnTxt}>Log out</span>
          </button>
        </li>
      </ul>
      <UserSettingsModal
        isOpen={modalsState.isSettingsModalOpen}
        onClose={() => toggleModal("isSettingsModalOpen")}
      />
      <LogOutModal
        isOpen={modalsState.isLogOutModalOpen}
        onClose={() => toggleModal("isLogOutModalOpen")}
      />
    </div>
  );
};

export default UserBarPopover;
