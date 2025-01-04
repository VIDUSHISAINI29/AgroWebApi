import {Router} from "express";
import { getPeatySoilData } from "../../controller/SoilWise/PeatySoilController.js";

const router = Router();
router.get('/',getPeatySoilData);
export default router;