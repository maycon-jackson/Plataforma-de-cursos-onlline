import express from 'express';
import MatriculaController from '../controllers/matriculaController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', MatriculaController.matricular);
router.get('/', MatriculaController.listar);
router.get('/:id', MatriculaController.detalhar);
router.patch('/:id/progresso', MatriculaController.atualizarProgresso);
router.delete('/:id', MatriculaController.cancelar);

export default router;

