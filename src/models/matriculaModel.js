const matriculas = [];
let proximoId = 1;

const MatriculaModel = {
  listarPorUsuario(usuarioId) {
    return matriculas.filter((m) => m.usuarioId === usuarioId);
  },
  buscarPorId(id) {
    return matriculas.find((m) => m.id === id);
  },
  buscarPorUsuarioECurso(usuarioId, cursoId) {
    return matriculas.find((m) => m.usuarioId === usuarioId && m.cursoId === cursoId);
  },
  criar({ usuarioId, cursoId }) {
    const nova = {
      id: proximoId++,
      usuarioId,
      cursoId,
      dataMatricula: new Date().toISOString().split('T')[0],
      progresso: 0,
      status: 'Em andamento'
    };
    matriculas.push(nova);
    return nova;
  },
  atualizarProgresso(id, progresso, status) {
    const matricula = this.buscarPorId(id);
    if (!matricula) return null;
    matricula.progresso = progresso;
    matricula.status = status;
    return matricula;
  },
  remover(id) {
    const index = matriculas.findIndex((m) => m.id === id);
    if (index !== -1) matriculas.splice(index, 1);
  }
};

export default MatriculaModel;

