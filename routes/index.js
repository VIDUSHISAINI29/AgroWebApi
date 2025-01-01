import express from "express";
const router = express.Router();

import cropsDataIndex from './Crops/index.js'

router.use('/', cropsDataIndex);

export default router;