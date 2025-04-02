import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import '../styles/LapTimeChart.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LapTimeChart = ({ title, labels, dataPoints }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        borderColor: '#45a29e',
        backgroundColor: '#66fcf1',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: '#66fcf1',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: true, labels: { color: '#c5c6c7' } } },
    scales: {
      x: { ticks: { color: '#c5c6c7' } },
      y: { ticks: { color: '#c5c6c7' } },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-title">{title}</div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LapTimeChart;
