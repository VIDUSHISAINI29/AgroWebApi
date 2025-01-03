import {Router} from "express";
import {getBarleyData} from "../../controller/CropsWise/BarleyController.js";

const router = Router();
router.get('/',getBarleyData);
export default router;