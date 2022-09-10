import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { chartDataType } from "./Statistics";
ChartJS.register(ArcElement, Tooltip, Legend);

type props = {
    chartData: chartDataType;
};

const Charts = ({ chartData }: props) => {
    return <Pie data={chartData}></Pie>;
};

const memoizedCharts = React.memo(Charts);

export default memoizedCharts;
