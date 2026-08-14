import { Router } from "express";
import { deleteItemController, getItemController, patchItemController, postItemController } from "../controllers/ItemController.js";

const router = Router()

router.get('/',getItemController)
router.post('/',postItemController)
router.patch('/:id',patchItemController)
router.delete('/:id',deleteItemController)

export default router