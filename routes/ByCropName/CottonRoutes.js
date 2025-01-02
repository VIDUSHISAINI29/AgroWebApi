import {Router} from "express";
import {getCottonData} from "../../controller/CottonController.js"

const router = Router();
router.get('/', getCottonData);
export default router;