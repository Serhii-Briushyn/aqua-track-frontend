import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { useTranslation } from "react-i18next";

import {
  selectCurrentWeek,
  selectIsLoadingWeekly,
  selectWeeklyData,
} from "../../redux/water/selectors";
import { selectUser } from "../../redux/auth/selectors";

import { chartOptions } from "../../utils/chartOptions";

import css from "./Chart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const Chart = () => {
  const chartRef = useRef(null);
  const [gradientBackground, setGradientBackground] = useState(null);

  const user = useSelector(selectUser);
  const weeklyData = useSelector(selectWeeklyData);
  const currentWeek = useSelector(selectCurrentWeek);
  const isLoading = useSelector(selectIsLoadingWeekly);
  const { t } = useTranslation();

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, chart.height, 0, 0);
      gradient.addColorStop(0, "rgba(155, 225, 160, 0)");
      gradient.addColorStop(1, "#9BE1A0");

      setGradientBackground(gradient);
    }
  }, []);

  const generateWeekLabels = () => {
    const startDate = new Date(currentWeek.startDate);
    const labels = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      labels.push(String(day.getDate()).padStart(2, "0"));
    }
    return labels;
  };

  const labels = generateWeekLabels();

  const dataValues = labels.map((day) => {
    const found = weeklyData.find(
      (item) => new Date(item.date).getDate() === Number(day)
    );
    return found ? found.amount / 1000 : 0;
  });

  const normValues = new Array(7).fill(user.waterNorm / 1000);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: t("waterIntake"),
        data: dataValues,
        borderColor: "#9BE1A0",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        backgroundColor: gradientBackground || "rgba(155, 225, 160, 0.5)",
        pointBackgroundColor: "#fff",
        pointBorderColor: "#9BE1A0",
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#fff",
      },
      {
        label: t("norm"),
        data: normValues,
        borderColor: "#FF6384",
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
        pointBackgroundColor: "#FF6384",
        pointBorderColor: "#FF6384",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#FF6384",
      },
    ],
  };

  return (
    <div className={`${css.chart} ${isLoading ? css.loader : ""}`}>
      <Line
        ref={chartRef}
        data={chartData}
        options={chartOptions(setGradientBackground, t)}
      />
    </div>
  );
};

export default Chart;
