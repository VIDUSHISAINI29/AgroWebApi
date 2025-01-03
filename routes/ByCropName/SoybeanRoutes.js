import {Router} from "express";
import { getSoybeanData } from "../../controller/CropsWise/SoybeanController.js";

const router = Router();
router.get('/', getSoybeanData);
export default router;