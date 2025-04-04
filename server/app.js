import express from 'express';
import cors from 'cors';
import fastf1Routes from './routes/fastf1Routes.js';

const app = express();
app.use(cors());
app.use('/api/fastf1', fastf1Routes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
