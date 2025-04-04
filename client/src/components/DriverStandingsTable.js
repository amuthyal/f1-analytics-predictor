import React, { useEffect, useState } from 'react';
import { getDriverStandingsByRound } from '../services/ergastApi';
import { countryFlagURL } from '../helpers/imageMappings';
import '../styles/DriverStandingsTable.css';

const DriverStandingsTable = ({ selectedRound }) => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    if (selectedRound) {
      getDriverStandingsByRound(2024, selectedRound).then((data) => {
        const formatted = data.map((driver) => ({
          position: driver.position,
          name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
          nationality: driver.Driver.nationality,
          team: driver.Constructors[0].name,
          points: driver.points
        }));
        setStandings(formatted);
      });
    }
  }, [selectedRound]);

  return (
    <div className="driver-standings-container">
      <h2>🏆 Driver Championship Standings</h2>
      <table className="driver-standings-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Driver</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((driver) => (
            <tr key={driver.position}>
              <td>{driver.position}</td>
              <td>
                {countryFlagURL[driver.nationality] && (
                  <img
                    className="flag-icon"
                    src={countryFlagURL[driver.nationality]}
                    alt={driver.nationality}
                  />
                )}{' '}
                {driver.name}
              </td>
              <td>{driver.team}</td>
              <td>{driver.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverStandingsTable;
