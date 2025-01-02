import {Router} from "express";
import {getWheatData} from "../../controller/WheatController.js";

const router = Router();
router.get('/', getWheatData);
export default router;