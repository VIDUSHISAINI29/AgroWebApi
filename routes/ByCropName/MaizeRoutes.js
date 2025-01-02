import {Router} from "express";
import {getMaizeData} from "../../controller/MaizeController.js";

const router = Router();
router.get('/', getMaizeData);
export default router;