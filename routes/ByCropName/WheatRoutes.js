import {Router} from "express";
import {getWheatData} from "../../controller/CropsWise/WheatController.js";

const router = Router();
router.get('/', getWheatData);
export default router;