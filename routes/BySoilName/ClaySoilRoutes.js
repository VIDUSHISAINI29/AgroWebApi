import {Router} from "express";
import { getClaySoilData } from "../../controller/SoilWise/ClaySoilController.js";

const router = Router();
router.get('/',getClaySoilData);
export default router;