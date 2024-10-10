import { ChartOptions } from "chart.js";

export const optionsPie: ChartOptions = {
  maintainAspectRatio: true,
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      align: "center",
      labels: {
        // padding: 15,
        // boxHeight: 20,
        // boxWidth: 50,
        // boxPadding: 10,
        font: {
          size: 10,
          family: "KanitLight",
        },
      },
    },
  },
};
