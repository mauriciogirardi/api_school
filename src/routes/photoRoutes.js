import { Router } from 'express';

import photoController from '../controllers/PhotoController';
import isAuthorization from '../middlewares/authentication';

const router = new Router();

router.post('/', isAuthorization, photoController.create);

export default router;
