import MatriculaService from '../services/matriculaService.js';

const MatriculaController = {
  matricular(req, res) {
    try {
      const matricula = MatriculaService.matricular(req.usuario.id, req.body.cursoId);
      return res.status(201).json(matricula);
    } catch (err) {
      return res.status(err.status || 500).json({ erro: err.message });
    }
  },

  listar(req, res) {
    return res.status(200).json(MatriculaService.listarDoUsuario(req.usuario.id));
  },

  detalhar(req, res) {
    try {
      return res.status(200).json(MatriculaService.detalhar(Number(req.params.id), req.usuario.id));
    } catch (err) {
      return res.status(err.status || 500).json({ erro: err.message });
    }
  },

  atualizarProgresso(req, res) {
    try {
      const matricula = MatriculaService.atualizarProgresso(
        Number(req.params.id),
        req.body.progresso,
        req.usuario.id
      );
      return res.status(200).json(matricula);
    } catch (err) {
      return res.status(err.status || 500).json({ erro: err.message });
    }
  },

  cancelar(req, res) {
    try {
      MatriculaService.cancelar(Number(req.params.id), req.usuario.id);
      return res.status(204).send();
    } catch (err) {
      return res.status(err.status || 500).json({ erro: err.message });
    }
  }
};

export default MatriculaController;

