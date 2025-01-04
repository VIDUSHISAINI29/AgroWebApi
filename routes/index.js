import express from "express";
const router = express.Router();

import cropsDataIndex from './Crops/index.js'
import byCropNameIndex from './ByCropName/index.js'
import byRegionNameIndex from './ByRegionName/index.js'
import bySoilNameIndex from './BySoilName/index.js'

router.use('/', cropsDataIndex);
router.use('/', byCropNameIndex);
router.use('/', byRegionNameIndex);
router.use('/', bySoilNameIndex);

export default router;