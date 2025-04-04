import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getConstructorStandingsByRound } from '../services/ergastApi';

const TeamPointsProgressionChart = ({ season }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const roundCount = 22; // Adjust based on season or fetch dynamically
      const teamMap = {};
      const rounds = [];

      for (let round = 1; round <= roundCount; round++) {
        const standings = await getConstructorStandingsByRound(season, round);
        const entry = { round: `Round ${round}` };
        standings.forEach(team => {
          const name = team.Constructor.name;
          entry[name] = parseFloat(team.points);
          teamMap[name] = true;
        });
        rounds.push(entry);
      }

      setData(rounds);
    };

    fetchData();
  }, [season]);

  return (
    <div className="team-points-chart">
      <h2>📈 Team Points Progression - {season}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="round" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          {data.length > 0 &&
            Object.keys(data[0]).filter(key => key !== 'round').map((team, idx) => (
              <Line key={team} type="monotone" dataKey={team} stroke={`hsl(${(idx * 50) % 360}, 70%, 50%)`} dot={false} />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeamPointsProgressionChart;
