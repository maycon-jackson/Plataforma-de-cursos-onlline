import CursoService from '../services/cursoService.js';

const CursoController = {
  listar(req, res) {
    return res.status(200).json(CursoService.listar());
  },

  detalhar(req, res) {
    try {
      return res.status(200).json(CursoService.detalhar(Number(req.params.id)));
    } catch (err) {
      return res.status(err.status || 500).json({ erro: err.message });
    }
  },

  criar(req, res) {
    try {
      const curso = CursoService.criar(req.body, req.usuario.id);
      return res.status(201).json(curso);
    } catch (err) {
      return res.status(err.status || 500).json({ erro: err.message });
    }
  },

  atualizar(req, res) {
    try {
      const curso = CursoService.atualizar(Number(req.params.id), req.body, req.usuario.id);
      return res.status(200).json(curso);
    } catch (err) {
      return res.status(err.status || 500).json({ erro: err.message });
    }
  },

  remover(req, res) {
    try {
      CursoService.remover(Number(req.params.id), req.usuario.id);
      return res.status(204).send();
    } catch (err) {
      return res.status(err.status || 500).json({ erro: err.message });
    }
  }
};

export default CursoController;

