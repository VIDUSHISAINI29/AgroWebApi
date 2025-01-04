import express from "express";
const app = express();

import sandySoilRoutes from './SandySoilRoutes.js';
import loamSoilRoutes from './LoamSoilRoutes.js';
import siltSoilRoutes from './SiltSoilRoutes.js';
import claySoilRoutes from './ClaySoilRoutes.js';
import peatySoilRoutes from './PeatySoilRoutes.js';
import chalkySoilRoutes from './ChalkySoilRoutes.js';

app.use('/sandy-soil-data', sandySoilRoutes);
app.use('/loam-soil-data', loamSoilRoutes);
app.use('/silt-soil-data', siltSoilRoutes);
app.use('/clay-soil-data', claySoilRoutes);
app.use('/peaty-soil-data', peatySoilRoutes);
app.use('/chalky-soil-data', chalkySoilRoutes);

export default app;