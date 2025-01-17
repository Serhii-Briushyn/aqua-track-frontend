import { selectNormaWater } from "../../redux/water/selectors";
import s from "./WaterDailyNorma.module.css";
import { useSelector } from "react-redux";
const WaterDailyNorma = () => {
  const normaWater = useSelector(selectNormaWater);
  return (
    <div className={s.water_daily_norma_container}>
      <h4 className={s.WaterDailyNorma}>{normaWater}L</h4>
      <p className={s.WaterDailyNorma_p}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
