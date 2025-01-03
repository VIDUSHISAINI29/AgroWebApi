import {Router} from "express";
import {getCottonData} from "../../controller/CropsWise/CottonController.js"

const router = Router();
router.get('/', getCottonData);
export default router;