import {Router} from "express";
import { getSandySoilData } from "../../controller/SoilWise/SandySoilController.js";

const router = Router();
router.get('/',getSandySoilData);
export default router;