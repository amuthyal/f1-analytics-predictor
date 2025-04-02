import React, { useEffect, useState } from 'react';
import { getAllRacesForSeason } from '../services/ergastApi';
import '../styles/RaceSelector.css';

const RaceSelector = ({ selectedRound, setSelectedRound }) => {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    getAllRacesForSeason().then(setRaces);
  }, []);

  return (
    <div className="race-selector-container">
      <label htmlFor="race-dropdown">Select a Race:</label>
      <select
        id="race-dropdown"
        className="race-select"
        onChange={(e) => setSelectedRound(e.target.value)}
        value={selectedRound}
      >
        <option value="">-- Select a race --</option>
        {races.map((race) => (
          <option key={race.round} value={race.round}>
            Round {race.round} - {race.raceName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RaceSelector;
