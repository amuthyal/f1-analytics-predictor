import React, { useEffect, useState } from 'react';
import { getFastF1Laps } from '../services/fastf1Api';

const TestLaps = () => {
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    getFastF1Laps(2023, 11).then(data => {
      console.log('LAP DATA:', data);
      setLaps(data.slice(0, 5)); // show first 5 laps
    });
  }, []);

  return (
    <div>
      <h2>FastF1 Laps</h2>
      <pre>{JSON.stringify(laps, null, 2)}</pre>
    </div>
  );
};

export default TestLaps;
