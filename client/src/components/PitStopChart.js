import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import '../styles/PitStopChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const PitStopChart = ({ pitStops }) => {
  const data = {
    labels: pitStops.map((_, idx) => `Stop ${idx + 1}`),
    datasets: [{
      label: 'Pit Stop Duration (s)',
      data: pitStops,
      backgroundColor: '#ffcc00',
    }],
  };

  const options = {
    responsive: true,
    plugins: { legend: { labels: { color: '#c5c6c7' } } },
    scales: {
      x: { ticks: { color: '#c5c6c7' } },
      y: { ticks: { color: '#c5c6c7' } },
    },
  };

  return (
    <div className="pitstop-chart-container">
      <div className="pitstop-chart-title">Pit Stop Durations</div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PitStopChart;
