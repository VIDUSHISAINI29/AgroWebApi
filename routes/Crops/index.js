import express from "express";
import pkg from "duckdb"
const app = express();
app.use(express.json());

import cropsDataRoutes from './CropsRoutes.js';

app.use('/crops-data', cropsDataRoutes);

export default app;