import {Router} from "express";
import { getWestData } from "../../controller/RegionWise/WestController.js";

const router = Router();
router.get('/', getWestData);
export default router;