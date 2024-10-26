import { Router } from 'express';
import TeamController from '../../controllers/team-controller.js';
import permissionMiddleware from '../../middlewares/permission-middleware.js';
import authMiddleware from '../../middlewares/auth-middleware.js';

const router = new Router();

router.get(
  '/all',
  authMiddleware,
  permissionMiddleware.bind(['createTeam', 'deleteTeam']),
  TeamController.getAll
);

router.get(
  '/list',
  authMiddleware,
  permissionMiddleware.bind(['assignTeam']),
  TeamController.getList
);

router.post(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['createTeam']),
  TeamController.create
);

router.put(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['createTeam']),
  TeamController.update
);

router.delete(
  '/',
  authMiddleware,
  permissionMiddleware.bind(['deleteTeam']),
  TeamController.delete
);

export default router;
