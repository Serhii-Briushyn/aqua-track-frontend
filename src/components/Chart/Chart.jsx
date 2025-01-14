import { useRef, useEffect, useState } from "react";
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
import {chartOptions} from "./utils/index.js";
import css from "./Chart.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const Chart = () => {
	const chartRef = useRef(null);
	const [gradientBackground, setGradientBackground] = useState(null);

	const data = {
		labels: ["16", "17", "18", "19", "20", "21", "22", "23"],
		datasets: [
			{
				label: "Water Intake",
				data: [1.2, 1.8, 1.7, 1.95, 1.6, 2.1, 2.1, 2.3],
				borderColor: "#9BE1A0",
				borderWidth: 3,
				tension: 0,
				fill: true,
				backgroundColor: gradientBackground || "rgba(155, 225, 160, 0)",
				pointBackgroundColor: "#fff",
				pointBorderColor: "#9BE1A0",
				pointBorderWidth: 3,
				pointRadius: 9,
				pointHoverRadius: 11,
				pointHoverBackgroundColor: "#fff",
			},
		],
	};


	useEffect(() => {
		const chart = chartRef.current;
		if (chart) {
			const ctx = chart.ctx;
			const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
			gradient.addColorStop(0, "#9BE1A0");
			gradient.addColorStop(1, "rgba(255, 225, 255, 0)");
			setGradientBackground(gradient);
		}
	}, []);

	return (
		<div className={css.chart}>
			<Line ref={chartRef} data={data} options={chartOptions} />
		</div>
	);
};

export default Chart;
