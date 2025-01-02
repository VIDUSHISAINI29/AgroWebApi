import express from "express";
import pkg from "duckdb";
const app = express();
app.use(express.json());

import riceDataRoutes from './RiceRoutes.js';
import cottonDataRoutes from './CottonRoutes.js';
import wheatDataRoutes from './WheatRoutes.js';
import barleyDataRoutes from './BarleyRoutes.js';
import maizeDataRoutes from './MaizeRoutes.js';
import soybeanDataRoutes from './SoybeanRoutes.js';

app.use('/rice-data', riceDataRoutes);
app.use('/cotton-data', cottonDataRoutes);
app.use('/wheat-data', wheatDataRoutes);
app.use('/barley-data', barleyDataRoutes);
app.use('/maize-data', maizeDataRoutes);
app.use('/soybean-data', soybeanDataRoutes);

export default app;
