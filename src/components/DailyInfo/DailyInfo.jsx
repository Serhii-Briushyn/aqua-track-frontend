import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

import ChooseDate from "../ChooseDate/ChooseDate.jsx";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx";
import WaterList from "../WaterList/WaterList.jsx";

import { selectIsLoadingDaily } from "../../redux/water/selectors.js";

import css from "./DailyInfo.module.css";

const DailyInfo = () => {
  const isLoading = useSelector(selectIsLoadingDaily);

  return (
    <div data-tour="water-history">
      <div className={css.infoHeader}>
        <ChooseDate />
        <AddWaterBtn />
      </div>
      {isLoading ? (
        <div className={css.loaderWrapper}>
          <CircularProgress sx={{ color: "#9be1a0" }} />
        </div>
      ) : (
        <WaterList />
      )}
    </div>
  );
};

export default DailyInfo;
