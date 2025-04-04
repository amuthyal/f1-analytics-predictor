import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDriverStandingsByRound } from '../services/ergastApi';
import '../styles/DriverPointsProgressionChart.css';

const DriverPointsProgressionChart = () => {
  const [data, setData] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchPointsProgression = async () => {
      const allRounds = Array.from({ length: 24 }, (_, i) => i + 1); // Adjust based on current season progress
      const progression = [];
      const driverMap = {};

      for (const round of allRounds) {
        const standings = await getDriverStandingsByRound(2024, round);
        const roundEntry = { round: `R${round}` };

        standings.forEach(driver => {
          const name = `${driver.Driver.givenName} ${driver.Driver.familyName}`;
          roundEntry[name] = parseFloat(driver.points);
          if (!drivers.includes(name)) {
            driverMap[name] = true;
          }
        });

        progression.push(roundEntry);
      }

      setDrivers(Object.keys(driverMap));
      setData(progression);
    };

    fetchPointsProgression();
  }, []);

  return (
    <div className="driver-points-chart-container">
      <h2>📈 Driver Points Progression (2024)</h2>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={data} margin={{ top: 20, right: 40, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="round" />
          <YAxis />
          <Tooltip />
          <Legend />
          {drivers.map((driver, index) => (
            <Line
              key={driver}
              type="monotone"
              dataKey={driver}
              stroke={`hsl(${(index * 60) % 360}, 70%, 50%)`}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DriverPointsProgressionChart;
