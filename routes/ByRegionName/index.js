import express from "express"
const app = express();

app.use(express.json());

import eastDataRoutes from './EastRoutes.js';
import westDataRoutes from './WestRoutes.js';
import northDataRoutes from './NorthRoutes.js';
import southDataRoutes from './SouthRoutes.js';

app.use('/east-data', eastDataRoutes);
app.use('/west-data', westDataRoutes);
app.use('/north-data', northDataRoutes);
app.use('/south-data', southDataRoutes);
export default app;

