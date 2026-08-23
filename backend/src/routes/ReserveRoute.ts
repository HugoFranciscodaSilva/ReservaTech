import { Router } from "express";
import { getReserveController, getReserveFromUserController, patchReserveController, postReserveController } from "../controllers/ReserveController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = Router()

router.get('/',authMiddleware,getReserveController)
router.get('/:id',authMiddleware,getReserveFromUserController)
router.post('/',authMiddleware,postReserveController)
router.patch('/:id',authMiddleware,roleMiddleware,patchReserveController)

export default router