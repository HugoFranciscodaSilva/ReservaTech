import { Router } from "express";
import { getReserveController, patchReserveController, postReserveController } from "../controllers/ReserveController.js";

const router = Router()

router.get('/',getReserveController)
router.post('/',postReserveController)
router.patch('/:id',patchReserveController)

export default router