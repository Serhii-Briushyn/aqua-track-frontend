import { FiSettings, FiLogOut } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import css from "./UserBarPopover.module.css";

const UserBarPopover = ({
  onClose,
  onOpenSettingsModal,
  onOpenLogOutModal,
}) => {
  const { t } = useTranslation();

  return (
    <div className={css.userBarPopover}>
      <ul>
        <li>
          <button
            className={css.setting}
            onClick={() => {
              onOpenSettingsModal();
              onClose();
            }}
          >
            <FiSettings />
            <span className={css.btnTxt}>{t("settings")}</span>
          </button>
        </li>
        <li>
          <button
            className={css.logout}
            onClick={() => {
              onOpenLogOutModal();
              onClose();
            }}
          >
            <FiLogOut />
            <span className={css.btnTxt}>{t("logout")}</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserBarPopover;
