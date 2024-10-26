import { Router } from 'express';
import RoleController from '../../controllers/role-controller.js';
import permissionMiddleware from '../../middlewares/permission-middleware.js';
import authMiddleware from '../../middlewares/auth-middleware.js';

const router = new Router();

router.post(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['createRole']),
  RoleController.create
);

router.put(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['createRole']),
  RoleController.update
);

router.delete(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['deleteRole']),
  RoleController.delete
);

router.delete(
  '/list',
  authMiddleware,
  permissionMiddleware.bind(['deleteRole']),
  RoleController.deleteList
);

router.get(
  '/all',
  authMiddleware,
  permissionMiddleware.bind(['createRole', 'deleteRole']),
  RoleController.getAll
);

router.get(
  '/list',
  authMiddleware,
  permissionMiddleware.bind(['assignRole']),
  RoleController.getList
);

export default router;
