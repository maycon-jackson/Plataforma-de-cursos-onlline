import MatriculaModel from '../models/matriculaModel.js';
import CursoModel from '../models/cursoModel.js';

const MatriculaService = {
  matricular(usuarioId, cursoId) {
    const curso = CursoModel.buscarPorId(cursoId);
    if (!curso) throw { status: 404, message: 'Curso não encontrado' };

    if (MatriculaModel.buscarPorUsuarioECurso(usuarioId, cursoId)) {
      throw { status: 400, message: 'Usuário já matriculado neste curso' };
    }

    return MatriculaModel.criar({ usuarioId, cursoId });
  },

  listarDoUsuario(usuarioId) {
    return MatriculaModel.listarPorUsuario(usuarioId);
  },

  detalhar(id, usuarioId) {
    const matricula = MatriculaModel.buscarPorId(id);
    if (!matricula) throw { status: 404, message: 'Matrícula não encontrada' };
    if (matricula.usuarioId !== usuarioId) {
      throw { status: 403, message: 'Sem permissão para consultar esta matrícula' };
    }
    return matricula;
  },

  atualizarProgresso(id, progresso, usuarioId) {
    const matricula = MatriculaModel.buscarPorId(id);
    if (!matricula) throw { status: 404, message: 'Matrícula não encontrada' };
    if (matricula.usuarioId !== usuarioId) {
      throw { status: 403, message: 'Sem permissão para alterar esta matrícula' };
    }
    if (typeof progresso !== 'number' || progresso < 0 || progresso > 100) {
      throw { status: 400, message: 'O progresso deve estar entre 0 e 100' };
    }

    const status = progresso === 100 ? 'Concluído' : 'Em andamento';
    return MatriculaModel.atualizarProgresso(id, progresso, status);
  },

  cancelar(id, usuarioId) {
    const matricula = MatriculaModel.buscarPorId(id);
    if (!matricula) throw { status: 404, message: 'Matrícula não encontrada' };
    if (matricula.usuarioId !== usuarioId) {
      throw { status: 403, message: 'Sem permissão para cancelar esta matrícula' };
    }
    MatriculaModel.remover(id);
  }
};

export default MatriculaService;

