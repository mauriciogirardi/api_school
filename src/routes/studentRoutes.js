import { Router } from 'express';

import isAuthorization from '../middlewares/authentication';
import studentController from '../controllers/StudentController';

const router = new Router();

router.get('/', studentController.index);
router.get('/:id', studentController.show);

router.post('/', isAuthorization, studentController.create);
router.delete('/:id', isAuthorization, studentController.delete);
router.put('/:id', isAuthorization, studentController.update);

export default router;
