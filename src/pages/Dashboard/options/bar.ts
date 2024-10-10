import { ChartOptions } from "chart.js";

export const optionsBar: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
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
