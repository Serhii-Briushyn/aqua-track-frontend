import { Link } from "react-router-dom";
import s from "./WelcomeSection.module.css";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const WelcomeSection = () => {
  const { t } = useTranslation();
  return (
    <div className={s.welcome_section}>
      <p className={s.text}>{t("recordWater")}</p>
      <h1 className={s.h1}>{t("trackerTitle")}</h1>
      <div className={s.link_container}>
        <Link className={s.register_btn} to="/signup">
          {t("tryTracker")}
        </Link>
        <Link className={s.login_btn} to="/signin">
          {t("signIn")}
        </Link>
      </div>
      <LanguageSwitcher />
    </div>
  );
};

export default WelcomeSection;
