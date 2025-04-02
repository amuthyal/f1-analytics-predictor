import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../styles/TireUsageChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const TireUsageChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [{
      label: 'Tire Compound Usage',
      data: Object.values(data),
      backgroundColor: ['#ffcc00', '#45a29e', '#ff4444', '#888888'],
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    plugins: { legend: { labels: { color: '#c5c6c7' } } },
  };

  return (
    <div className="tire-chart-container">
      <div className="tire-chart-title">Tire Compound Usage</div>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default TireUsageChart;
