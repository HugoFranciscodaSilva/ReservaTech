import { Router } from "express";
import { deleteUserController, getUserController, getUsersController, patchUserController, postUserController } from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";


const router = Router()

router.get('/',authMiddleware,roleMiddleware,getUsersController)
router.get('/:id',authMiddleware,roleMiddleware,getUserController)
router.post('/',postUserController)
router.patch('/:id',authMiddleware,patchUserController)
router.delete('/:id',authMiddleware,deleteUserController)

export default router