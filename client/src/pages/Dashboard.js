import React, { useState, useEffect } from 'react';
import RaceSelector from '../components/RaceSelector';
import RaceTracker from '../components/RaceTracker';
import TeamPointsProgressionChart from '../components/TeamPointsProgressionChart';
import DriverStandingsTable from '../components/DriverStandingsTable';
import DriverPointsProgressionChart from '../components/DriverPointsProgressionChart';
import PositionChangeChart from '../components/PositionChangeChart';
import { getRaceResultsByRound } from '../services/ergastApi';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [selectedRound, setSelectedRound] = useState('');
  const [selectedSeason, setSelectedSeason] = useState(2024);
  const [raceData, setRaceData] = useState([]);

  useEffect(() => {
    if (selectedRound) {
      getRaceResultsByRound(selectedSeason, selectedRound).then((data) => {
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
  }, [selectedSeason, selectedRound]);

  return (
    <div className="dashboard-container">
      <h1>🏁 F1 Race Performance Dashboard</h1>

      <RaceSelector
        selectedRound={selectedRound}
        setSelectedRound={setSelectedRound}
        selectedSeason={selectedSeason}
        setSelectedSeason={setSelectedSeason}
      />

      {selectedRound && raceData.length > 0 && (
        <>
          <RaceTracker drivers={raceData} />
          <DriverStandingsTable selectedRound={selectedRound} />
          <DriverPointsProgressionChart />
          <TeamPointsProgressionChart season={selectedSeason} />
          <PositionChangeChart selectedRound={selectedRound} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
