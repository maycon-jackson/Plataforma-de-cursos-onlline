const cursos = [];
let proximoId = 1;

const CursoModel = {
  listarTodos() {
    return cursos;
  },
  buscarPorId(id) {
    return cursos.find((c) => c.id === id);
  },
  criar({ titulo, descricao, carga_horaria, categoria, usuarioId }) {
    const novo = { id: proximoId++, titulo, descricao, carga_horaria, categoria, usuarioId };
    cursos.push(novo);
    return novo;
  },
  atualizar(id, { titulo, descricao, carga_horaria, categoria }) {
    const curso = this.buscarPorId(id);
    if (!curso) return null;
    curso.titulo = titulo;
    curso.descricao = descricao;
    curso.carga_horaria = carga_horaria;
    curso.categoria = categoria;
    return curso;
  },
  remover(id) {
    const index = cursos.findIndex((c) => c.id === id);
    if (index !== -1) cursos.splice(index, 1);
  }
};

export default CursoModel;

