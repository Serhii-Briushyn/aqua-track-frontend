import WaterItem from "../WaterItem/WaterItem";
import { useEffect, useState } from "react";
import "simplebar-react/dist/simplebar.min.css";
import "./simplebar.lib.css";
import SimpleBar from "simplebar-react";
import css from "./WaterList.module.css";
import { selectDailyData } from "../../redux/water/selectors";
import { useSelector } from "react-redux";

const WaterList = () => {
  const [resizeKey, setResizeKey] = useState(0);
  const dailyData = useSelector(selectDailyData);

  useEffect(() => {
    const handleResize = () => {
      setResizeKey((prev) => prev + 1);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={css.waterList}>
      <SimpleBar key={resizeKey} autoHide={false}>
        <div className={css.waterItemsList}>
          {dailyData.length ? (
            dailyData.map((item, index) => (
              <div key={index} className={css.scrollableItemContainer}>
                <WaterItem item={item} index={index} key={index} />
              </div>
            ))
          ) : (
            <h3 className={css.h3}>
              Looks like there&apos;s nothing here yet!
              <br /> Tap &apos;Add Water&apos; to start tracking for today.
            </h3>
          )}
        </div>
      </SimpleBar>
    </div>
  );
};

export default WaterList;
