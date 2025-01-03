import {Router} from "express";
import { getEastData } from "../../controller/RegionWise/EastController.js";

const router = Router();
router.get('/', getEastData);
export default router;