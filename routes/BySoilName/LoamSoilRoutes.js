import {Router} from "express";
import { getLoamSoilData } from "../../controller/SoilWise/LoamSoilController.js";

const router = Router();
router.get('/',getLoamSoilData);
export default router;