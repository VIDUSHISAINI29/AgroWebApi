import { Router } from "express";
import { getRiceData } from "../../controller/CropsWise/RiceController.js";

const router = Router();
router.get('/', getRiceData);
export default router;
