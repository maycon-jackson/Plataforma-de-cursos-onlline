import CursoModel from '../models/cursoModel.js';

const CursoService = {
  listar() {
    return CursoModel.listarTodos();
  },

  detalhar(id) {
    const curso = CursoModel.buscarPorId(id);
    if (!curso) throw { status: 404, message: 'Curso não encontrado' };
    return curso;
  },

  criar({ titulo, descricao, carga_horaria, categoria }, usuarioId) {
    if (!titulo || titulo.trim() === '') throw { status: 400, message: 'O título é obrigatório' };
    if (!descricao || descricao.trim() === '') throw { status: 400, message: 'A descrição é obrigatória' };
    if (!categoria || categoria.trim() === '') throw { status: 400, message: 'A categoria é obrigatória' };
    if (!carga_horaria || carga_horaria <= 0) {
      throw { status: 400, message: 'A carga horária deve ser maior que zero' };
    }

    return CursoModel.criar({ titulo, descricao, carga_horaria, categoria, usuarioId });
  },

  atualizar(id, { titulo, descricao, carga_horaria, categoria }, usuarioId) {
    const curso = CursoModel.buscarPorId(id);
    if (!curso) throw { status: 404, message: 'Curso não encontrado' };
    if (curso.usuarioId !== usuarioId) {
      throw { status: 403, message: 'Sem permissão para alterar este curso' };
    }

    if (!titulo || titulo.trim() === '') throw { status: 400, message: 'O título é obrigatório' };
    if (!descricao || descricao.trim() === '') throw { status: 400, message: 'A descrição é obrigatória' };
    if (!categoria || categoria.trim() === '') throw { status: 400, message: 'A categoria é obrigatória' };
    if (!carga_horaria || carga_horaria <= 0) {
      throw { status: 400, message: 'A carga horária deve ser maior que zero' };
    }

    return CursoModel.atualizar(id, { titulo, descricao, carga_horaria, categoria });
  },

  remover(id, usuarioId) {
    const curso = CursoModel.buscarPorId(id);
    if (!curso) throw { status: 404, message: 'Curso não encontrado' };
    if (curso.usuarioId !== usuarioId) {
      throw { status: 403, message: 'Sem permissão para remover este curso' };
    }
    CursoModel.remover(id);
  }
};

export default CursoService;

