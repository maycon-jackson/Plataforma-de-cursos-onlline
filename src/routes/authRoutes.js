import express from 'express';
import AuthController from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/cadastro', AuthController.cadastrar);
router.post('/login', AuthController.login);
router.get('/perfil', authMiddleware, AuthController.perfil);

export default router;

