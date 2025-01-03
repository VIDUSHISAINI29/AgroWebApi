import {Router} from "express";
import { getSouthData } from "../../controller/RegionWise/SouthController.js";

const router = Router();
router.get('/', getSouthData);
export default router;