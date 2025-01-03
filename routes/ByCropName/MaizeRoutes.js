import {Router} from "express";
import {getMaizeData} from "../../controller/CropsWise/MaizeController.js";

const router = Router();
router.get('/', getMaizeData);
export default router;