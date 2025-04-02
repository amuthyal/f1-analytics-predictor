import React from 'react';
import '../styles/RaceTracker.css';
import { countryFlagURL } from '../helpers/imageMappings';

const RaceTracker = ({ drivers }) => (
  <div className="race-tracker-container">
    <table className="race-tracker-table">
      <thead>
        <tr>
          <th>Position</th>
          <th>Driver</th>
          <th>Team</th>
          <th>Last Lap</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver) => (
          <tr key={driver.position}>
            <td className="position">{driver.position}</td>
            <td>
              {countryFlagURL[driver.nationality] ? (
                <img
                  className="flag-icon"
                  src={countryFlagURL[driver.nationality]}
                  alt={driver.nationality}
                />
              ) : (
                <span>{driver.nationality}</span>
              )}{' '}
              {driver.driverName}
            </td>
            <td>{driver.team}</td>
            <td>{driver.lastLap}</td>
            <td>{driver.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RaceTracker;
