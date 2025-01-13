export const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		tooltip: {
			callbacks: {
				title: function (context) {
					const value = context[0].raw;
					return `${value * 1000} ml`;
				},
				label: function () {
					return '';
				},
			},
			backgroundColor: "#fff",
			titleColor: "#323F47",
			titleFont: { size: 12 },
			bodyFont: { size: 0 },
			displayColors: false,
			padding: {
				top: 10,
				right: 17,
				bottom: 4,
				left: 17,
			},
			borderWidth: 1,
			borderRadius: 15,
			borderColor: "#E0E0E0", // Border color
		},

	},

	scales: {
		x: {
			grid: {
				display: false,
				drawBorder: false,
			},
			ticks: {
				display: true,
				font: {
					size: 15,
				},
			},
			border: {
				display: false,
			},
		},
		y: {
			grid: {
				display: false,
				drawBorder: false,
			},
			beginAtZero: true,
			max: 2.5,
			ticks: {
				display: true,
				font: {
					size: 15,
				},
			},
			border: {
				display: false,
			},
		},
	},
};
