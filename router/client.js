import { Router } from 'express';
import ClientController from '../controllers/client-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = new Router();

router.post('/registration', ClientController.registration);
router.post('/login', ClientController.login);
router.post('/logout', ClientController.logout);
router.get('/activate/:link', ClientController.activate);
router.get('/refresh', ClientController.refresh);
router.post('/activation-code', authMiddleware, ClientController.sendNewActivationCode);
router.put('/user/edit', authMiddleware, ClientController.update);
router.get('/history/all', authMiddleware, ClientController.getHistoryAll);
router.post('/history', authMiddleware, ClientController.createHistory);
router.post('/gpt', authMiddleware, ClientController.sendGPTMessage);

export default router;
