import { Router } from "express";
import { getRiceData } from "../../controller/RiceController.js";

const router = Router();
router.get('/', getRiceData);
export default router;
