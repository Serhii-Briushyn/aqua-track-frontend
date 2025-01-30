import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

import css from "./WelcomeSection.module.css";

const WelcomeSection = () => {
  const { t } = useTranslation();
  
  return (
    <div className={css.welcome_section}>
      <p className={css.text}>{t("recordWater")}</p>
      <h1 className={css.h1}>{t("trackerTitle")}</h1>
      <div className={css.link_container}>
        <Link className={css.register_btn} to="/signup">
          {t("tryTracker")}
        </Link>
        <Link className={css.login_btn} to="/signin">
          {t("signIn")}
        </Link>
      </div>
      <LanguageSwitcher />
    </div>
  );
};

export default WelcomeSection;
