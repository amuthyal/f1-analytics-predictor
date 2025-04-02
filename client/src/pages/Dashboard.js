import React, { useState, useEffect } from 'react';
import LapTimeChart from '../components/LapTimeChart';
import PitStopChart from '../components/PitStopChart';
import TireUsageChart from '../components/TireUsageChart';
import RaceSelector from '../components/RaceSelector';
import RaceTracker from '../components/RaceTracker';
import { getRaceResultsByRound } from '../services/ergastApi';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [selectedRound, setSelectedRound] = useState('');
  const [raceData, setRaceData] = useState([]);

  const tireData = { Soft: 14, Medium: 18, Hard: 7, Intermediate: 1 }; // Sample data for now

  useEffect(() => {
    if (selectedRound) {
      getRaceResultsByRound(2024, selectedRound).then((data) => {
        const formatted = data.map(driver => ({
          position: driver.position,
          driverName: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
          nationality: driver.Driver.nationality,
          team: driver.Constructor.name,
          lastLap: driver.FastestLap?.Time?.time || 'N/A',
          points: driver.points
        }));
        setRaceData(formatted);
      });
    }
  }, [selectedRound]);

  return (
    <div className="dashboard-container">
      <h1>🏁 F1 Race Performance Dashboard</h1>

      <RaceSelector selectedRound={selectedRound} setSelectedRound={setSelectedRound} />

      {selectedRound && raceData.length > 0 && (
        <>
          <RaceTracker drivers={raceData} />

          <h2>Tire Compound Usage (Sample Data)</h2>
          <TireUsageChart data={tireData} />

          {/* Future analytics based on selectedRound can be added here */}
        </>
      )}
    </div>
  );
};

export default Dashboard;
