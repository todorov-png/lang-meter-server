import { Router } from 'express';
import UserController from '../../controllers/user-controller.js';
import authMiddleware from '../../middlewares/auth-middleware.js';
import permissionMiddleware from '../../middlewares/permission-middleware.js';

const router = new Router();

router.get(
  '/all',
  authMiddleware,
  permissionMiddleware.bind(['assignRole', 'assignTeam', 'deleteUser']),
  UserController.getAll
);
router.post(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['createUser']),
  UserController.create
);
router.put(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['assignRole', 'assignTeam']),
  UserController.update
);
router.delete(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['deleteUser']),
  UserController.delete
);

export default router;
