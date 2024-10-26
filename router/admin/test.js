import { Router } from 'express';
import TestController from '../../controllers/test-controller.js';
// import permissionMiddleware from '../../middlewares/permission-middleware.js';
import authMiddleware from '../../middlewares/auth-middleware.js';

const router = new Router();

router.get(
  '/list',
  authMiddleware,
  // permissionMiddleware.bind(['createRole', 'deleteRole']),
  TestController.getList
);

router.get(
  '/all',
  authMiddleware,
  // permissionMiddleware.bind(['createRole', 'deleteRole']),
  TestController.getAll
);

router.get(
  '/:id',
  authMiddleware,
  // permissionMiddleware.bind(['createRole', 'deleteRole']),
  TestController.get
);

export default router;
