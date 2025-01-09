import WaterItem from "../WaterItem/WaterItem";
import { useEffect, useState } from "react";
import "simplebar-react/dist/simplebar.min.css";
import "./simplebar.lib.css";
import SimpleBar from "simplebar-react";
import css from "./WaterList.module.css";

const WaterList = () => {
  const [resizeKey, setResizeKey] = useState(0);

  useEffect(() => {
    // SimpleBar can't recalculate itself properly when the page size is reduced.

    const handleResize = () => {
      setResizeKey((prev) => prev + 1); // Trigger re-render
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
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className={css.scrollableItemContainer}>
              <WaterItem index={index} key={index} />
            </div>
          ))}
        </div>
      </SimpleBar>
    </div>
  );
};

export default WaterList;
