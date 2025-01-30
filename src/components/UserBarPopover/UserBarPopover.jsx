import { useTranslation } from "react-i18next";

import icons from "../../assets/icons/icons.svg";

import css from "./UserBarPopover.module.css";

const UserBarPopover = ({ onSettingsClick, onLogOutClick }) => {
  const { t } = useTranslation();

  return (
    <div className={css.userBarPopover}>
      <button className={css.setting} onClick={onSettingsClick}>
        <svg className={css.iconSettings}>
          <use href={`${icons}#icon-settings`} />
        </svg>
        <span className={css.settingsText}>{t("setting")}</span>
      </button>

      <button className={css.logout} onClick={onLogOutClick}>
        <svg className={css.iconLogout}>
          <use href={`${icons}#icon-logout`} />
        </svg>
        <span className={css.logoutText}>{t("logout")}</span>
      </button>
    </div>
  );
};

export default UserBarPopover;
