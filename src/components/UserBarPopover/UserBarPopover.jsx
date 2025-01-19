import { useCallback, useState } from "react";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import LogOutModal from "../LogOutModal/LogOutModal";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal";

import css from "./UserBarPopover.module.css";

const UserBarPopover = () => {
  const { t } = useTranslation();

  const [modalsState, setModalsState] = useState({
    isSettingsModalOpen: false,
    isLogOutModalOpen: false,
  });

  const toggleModal = useCallback((modalName) => {
    setModalsState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  }, []);

  const closeSettingsModal = useCallback(() => {
    setModalsState((prevState) => ({
      ...prevState,
      isSettingsModalOpen: false,
    }));
  }, []);

  const closeLogOutModal = useCallback(() => {
    setModalsState((prevState) => ({
      ...prevState,
      isLogOutModalOpen: false,
    }));
  }, []);

  return (
    <div className={css.userBarPopover}>
      <ul>
        <li>
          <button
            className={css.setting}
            onClick={() => toggleModal("isSettingsModalOpen")}
          >
            <FiSettings />
            <span className={css.btnTxt}>{t("settings")}</span>
          </button>
        </li>
        <li>
          <button
            className={css.logout}
            onClick={() => toggleModal("isLogOutModalOpen")}
          >
            <FiLogOut />
            <span className={css.btnTxt}>{t("logout")}</span>
          </button>
        </li>
      </ul>
      <UserSettingsModal
        isOpen={modalsState.isSettingsModalOpen}
        onClose={closeSettingsModal}
      />
      <LogOutModal
        isOpen={modalsState.isLogOutModalOpen}
        onClose={closeLogOutModal}
      />
    </div>
  );
};

export default UserBarPopover;
