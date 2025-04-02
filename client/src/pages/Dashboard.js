import React from 'react';
import '../styles/Dashboard.css';
import LapTimeChart from '../components/LapTimeChart';
import TireUsageChart from '../components/TireUsageChart';
import PitStopChart from '../components/PitStopChart';

const Dashboard = () => {
  const laps = ['Lap 1', 'Lap 2', 'Lap 3', 'Lap 4', 'Lap 5'];
  const lapTimes = [88.2, 87.6, 87.3, 88.1, 87.9];

  const tireData = {
    Soft: 15,
    Medium: 25,
    Hard: 5,
    Intermediate: 0,
  };

  const pitStops = [2.8, 3.1, 2.6];

  return (
    <div className="dashboard-container">
      <h1>🏁 F1 Race Performance Dashboard</h1>
      <LapTimeChart title="Lap Times (s)" labels={laps} dataPoints={lapTimes} />
      <h2>Tire Compound Usage</h2>
      <TireUsageChart data={tireData} />
      <h2>Pit Stop Durations</h2>
      <PitStopChart pitStops={pitStops} />
    </div>
  );
};

export default Dashboard;
