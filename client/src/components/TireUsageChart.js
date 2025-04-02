import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TireUsageChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Tire Compound Usage',
        data: Object.values(data),
        backgroundColor: ['#ffcc00', '#ff4444', '#44aaff', '#888888'], // Soft, Medium, Hard, Inter
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <Pie data={chartData} />
    </div>
  );
};

export default TireUsageChart;
