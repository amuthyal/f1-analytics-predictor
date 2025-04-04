import React, { useEffect, useState } from 'react';
import '../styles/RaceSelectionForm.css';


const RaceSelectionForm = ({ onSelect }) => {
  const [seasons] = useState([2024, 2023, 2022, 2021]); // you can add more
  const [selectedSeason, setSelectedSeason] = useState(2024);
  const [rounds, setRounds] = useState([]);
  const [selectedRound, setSelectedRound] = useState(null);

  useEffect(() => {
    const fetchRounds = async () => {
      const res = await fetch(`https://ergast.com/api/f1/${selectedSeason}.json`);
      const data = await res.json();
      const raceList = data.MRData.RaceTable.Races;
      setRounds(raceList.map((race) => ({ round: race.round, name: race.raceName })));
    };

    fetchRounds();
  }, [selectedSeason]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSeason && selectedRound) {
      onSelect({ season: selectedSeason, round: selectedRound });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="race-selector-form">
      <label>
        Year:
        <select value={selectedSeason} onChange={(e) => setSelectedSeason(Number(e.target.value))}>
          {seasons.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>

      <label>
        Round:
        <select
          value={selectedRound || ''}
          onChange={(e) => setSelectedRound(Number(e.target.value))}
        >
          <option value="" disabled>Select Round</option>
          {rounds.map((r) => (
            <option key={r.round} value={r.round}>
              {r.round} - {r.name}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Load Telemetry</button>
    </form>
  );
};

export default RaceSelectionForm;
