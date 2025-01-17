// WaterMainInfo.jsx component

import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import s from "./WaterMainInfo.module.css";
import bottleImageMobile from "../../assets/images/bottle-image-mob-min.png";
import bottleImageTablet from "../../assets/images/bottle-image-tab-min.png";
import bottleImageDesktop from "../../assets/images/bottle-image-desk-min.png";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectNormaWater } from "../../redux/water/selectors.js";
import { resetTotalAmount } from "../../redux/water/slice.js";
import toast from "react-hot-toast";
const getImageSource = () => {
  if (window.innerWidth >= 1440) {
    return bottleImageDesktop;
  } else if (window.innerWidth >= 768) {
    return bottleImageTablet;
  } else {
    return bottleImageMobile;
  }
};

const WaterMainInfo = ({ payload }) => {
  const dispatch = useDispatch();
  const [imageSource, setImageSource] = useState(getImageSource());

  const waterData = useSelector((state) => state.water.waterData);
  const totalAmount =
    waterData.reduce((acc, item) => acc + item.amount, 0) / 1000;

  const date = payload?.date || new Date();
  const normaWater = useSelector(selectNormaWater);
  useEffect(() => {
    if (totalAmount >= normaWater) {
      console.log(totalAmount);
      dispatch(resetTotalAmount());
      toast.success("Congratulations! You've reached the daily water norm.");
    }
  }, [totalAmount, normaWater, dispatch]);
  useEffect(() => {
    const handleSize = () => {
      setImageSource(getImageSource());
    };

    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  return (
    <div className={s.water_main_info}>
      <img src={imageSource} alt="water-icon" className={s.water_icon} />
      <WaterDailyNorma />
      <WaterProgressBar amount={totalAmount} norm={normaWater} date={date} />
      <AddWaterBtn type="waterMain" />
    </div>
  );
};
export default WaterMainInfo;
