import { Router } from "express";
import { deleteItemController, getItemController, patchItemController, postItemController } from "../controllers/ItemController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = Router()

router.get('/',authMiddleware,getItemController)
router.post('/',authMiddleware,roleMiddleware,postItemController)
router.patch('/:id',authMiddleware,roleMiddleware,patchItemController)
router.delete('/:id',authMiddleware,roleMiddleware,deleteItemController)

export default router