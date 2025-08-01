// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import stockEntryRoutes from './routes/stockEntry.routes';
import stockExitRoutes from './routes/stockExit.routes';
import movementRoutes from './routes/stockMovement.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use('/stock-entries', stockEntryRoutes);
app.use('/stock-exits', stockExitRoutes);
app.use('/movements', movementRoutes);

app.listen(PORT, () => {
  console.log(`✅ Stock Service listening on port ${PORT}`);
});
