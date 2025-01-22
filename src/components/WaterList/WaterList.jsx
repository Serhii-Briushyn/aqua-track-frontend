import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import SimpleBar from "simplebar-react";
import WaterItem from "../WaterItem/WaterItem";

import "simplebar-react/dist/simplebar.min.css";
import "./simplebar.lib.css";
import css from "./WaterList.module.css";

const WaterList = ({ dailyData, onSubmitSuccess }) => {
  const [resizeKey, setResizeKey] = useState(0);
  const { t } = useTranslation();

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
                <WaterItem
                  item={item}
                  index={index}
                  key={index}
                  onSubmitSuccess={onSubmitSuccess}
                />
              </div>
            ))
          ) : (
            <h3 className={css.h3}>
              {t("noDataMessage")}
              <br /> {t("addWaterPrompt")}
            </h3>
          )}
        </div>
      </SimpleBar>
    </div>
  );
};

export default WaterList;
