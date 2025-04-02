import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LapTimeChart = ({ title, labels, dataPoints }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        borderColor: 'red',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <Line data={data} />
    </div>
  );
};

export default LapTimeChart;
