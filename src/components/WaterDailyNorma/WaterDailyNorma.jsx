import { useSelector } from "react-redux";
import css from "./WaterDailyNorma.module.css";
import { selectUser } from "../../redux/auth/selectors";

const WaterDailyNorma = () => {
  const user = useSelector(selectUser);
  const waterNorm = user?.waterNorm || "1.5";

  return (
    <div className={css.water_daily_norma_container}>
      <h4 className={css.WaterDailyNorma}>{waterNorm} L</h4>
      <p className={css.WaterDailyNorma_p}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
