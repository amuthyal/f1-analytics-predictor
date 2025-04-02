import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const PitStopChart = ({ pitStops }) => {
  const chartData = {
    labels: pitStops.map((_, idx) => `Stop ${idx + 1}`),
    datasets: [
      {
        label: 'Pit Stop Duration (s)',
        data: pitStops,
        backgroundColor: '#ff4444',
      },
    ],
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <Bar data={chartData} />
    </div>
  );
};

export default PitStopChart;
