import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import s from "./WelcomeSection.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const WelcomeSection = () => {
  const { t } = useTranslation();
  return (
    <div className={s.welcome_section}>
      <div>
        <Logo />
        <LanguageSwitcher />
        <div className={s.basic_container}>
          <h2 className={s.h2}>{t("recordWater")}</h2>
          <h1 className={s.h1}>{t("trackerTitle")}</h1>
          <div className={s.link_container}>
            <Link className={s.register_btn} to="/signup">
              {t("tryTracker")}
            </Link>
            <Link className={s.login_btn} to="/signin">
              {t("signIn")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
