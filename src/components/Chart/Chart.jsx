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

const Chart = ({data}) => {
	const chartRef = useRef(null);
	const [gradientBackground, setGradientBackground] = useState(null);

	const labels = data.map(item => new Date(item.date).getDate()); // Extract day of the month
	const dataValues = data.map(item => item.amount / 1000); // Convert ml to liters

	const chartData = {
		labels: labels,
		datasets: [
			{
				label: "Water Intake",
				data: dataValues,
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
			<Line ref={chartRef} data={chartData} options={chartOptions} />
		</div>
	);
};

export default Chart;
