import {Router} from "express";
import { getSiltSoilData } from "../../controller/SoilWise/SiltSoilController.js";

const router = Router();
router.get('/',getSiltSoilData);
export default router;