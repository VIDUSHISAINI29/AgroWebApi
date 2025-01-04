import {Router} from "express";
import { getChalkySoilData } from "../../controller/SoilWise/ChalkySoilController.js";

const router = Router();
router.get('/',getChalkySoilData);
export default router;