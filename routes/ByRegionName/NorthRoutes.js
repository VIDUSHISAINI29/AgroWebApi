import {Router} from "express";
import { getNorthData } from "../../controller/RegionWise/NorthController.js";

const router = Router();
router.get('/', getNorthData);
export default router;