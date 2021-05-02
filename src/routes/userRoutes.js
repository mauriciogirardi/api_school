import { Router } from 'express';
import isAuthorization from '../middlewares/authentication';
import userController from '../controllers/UserController';

const router = new Router();

router.post('/', isAuthorization, userController.create);
router.put('/', isAuthorization, userController.update);
router.delete('/', isAuthorization, userController.delete);

export default router;
