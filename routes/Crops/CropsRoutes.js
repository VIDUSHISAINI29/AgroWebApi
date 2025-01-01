import {Router} from "express";
import { getCropsData } from "../../controller/CropsController.js";

const router = Router();
router.get('/', getCropsData);
export default router;