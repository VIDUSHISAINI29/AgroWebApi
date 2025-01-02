import {Router} from "express";
import {getBarleyData} from "../../controller/BarleyController.js";

const router = Router();
router.get('/',getBarleyData);
export default router;