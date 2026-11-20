import express from 'express';
import CursoController from '../controllers/cursoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', CursoController.listar);
router.get('/:id', CursoController.detalhar);
router.post('/', authMiddleware, CursoController.criar);
router.put('/:id', authMiddleware, CursoController.atualizar);
router.delete('/:id', authMiddleware, CursoController.remover);

export default router;

