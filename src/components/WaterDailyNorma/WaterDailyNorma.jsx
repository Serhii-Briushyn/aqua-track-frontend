import { useSelector } from "react-redux";

import { selectUser } from "../../redux/auth/selectors";
import { useTranslation } from "react-i18next";

import css from "./WaterDailyNorma.module.css";

const WaterDailyNorma = () => {
  const user = useSelector(selectUser);
  const { t } = useTranslation();

  const waterNorm = user?.waterNorm
    ? (user.waterNorm / 1000).toFixed(1)
    : "1.8";

  return (
    <div className={css.water_daily_norma_container} data-tour="daily-norm">
      <h4 className={css.WaterDailyNorma}>
        {waterNorm} {t("l")}
      </h4>
      <p className={css.WaterDailyNorma_p}>{t("dailyNorma")}</p>
    </div>
  );
};

export default WaterDailyNorma;
