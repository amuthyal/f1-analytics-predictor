import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getLapPositionsByRound } from '../services/ergastApi';
import '../styles/PositionChangeChart.css';

const PositionChangeChart = ({ selectedRound }) => {
  const [data, setData] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    if (!selectedRound) return;

    const fetchData = async () => {
      const lapData = await getLapPositionsByRound(2024, selectedRound);
      const driverCodes = new Set();
      const lapMap = {};

      lapData.forEach(entry => {
        const lap = entry.number;
        if (!lapMap[lap]) lapMap[lap] = { lap: parseInt(lap) };

        entry.Timings.forEach(timing => {
          lapMap[lap][timing.driverId] = parseInt(timing.position);
          driverCodes.add(timing.driverId);
        });
      });

      const sortedLaps = Object.values(lapMap).sort((a, b) => a.lap - b.lap);

      console.log('Mapped chart data:', sortedLaps);

      setData(sortedLaps);
      setDrivers(Array.from(driverCodes));
    };

    fetchData();
  }, [selectedRound]);

  return (
    <div className="position-change-chart-container">
      <h2>📉 Position Changes by Lap</h2>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart  data={data} margin={{ top: 20, right: 40, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="lap" tickFormatter={(tick) => `Lap ${tick}`} />
          <YAxis reversed allowDecimals={false} domain={[1, 20]} />
          <Tooltip
            formatter={(value, name) => [`P${value}`, name.replace(/_/g, ' ')]}
            labelStyle={{ color: '#fff' }}
            contentStyle={{ backgroundColor: '#1e1e2f', border: '1px solid #333' }}
          />
          <Legend />
          {drivers.map((driver, index) => (
            <Line
              key={driver}
              type="monotone"
              dataKey={driver}
              stroke={`hsl(${(index * 60) % 360}, 70%, 50%)`}
              strokeWidth={2}
              dot={false}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PositionChangeChart;
