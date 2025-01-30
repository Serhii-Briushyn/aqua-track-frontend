export const chartOptions = (setGradientBackground, t) => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: "Poppins",
          weight: "400",
          size: 15,
        },
        color: "#323f47",
      },
    },
    y: {
      grid: {
        display: false,
      },
      min: 0,
      suggestedMax: 2.5,
      ticks: {
        stepSize: 0.5,
        callback: (value) => {
          return `${value} ${t("l")}`;
        },
        font: {
          family: "Poppins",
          weight: "400",
          size: 14,
        },
        color: "#323f47",
      },
    },
  },
  layout: {
    padding: {
      top: 0,
      bottom: 0,
    },
  },
  plugins: {
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
  onResize: (chart) => {
    if (chart && chart.ctx) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(155, 225, 160, 0)");
      gradient.addColorStop(1, "#9BE1A0");
      setGradientBackground(gradient);
    }
  },
});
