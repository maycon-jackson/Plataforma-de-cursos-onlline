const usuarios = [];
let proximoId = 1;

const UsuarioModel = {
  buscarPorEmail(email) {
    return usuarios.find((u) => u.email === email);
  },
  buscarPorId(id) {
    return usuarios.find((u) => u.id === id);
  },
  criar({ nome, email, senha }) {
    const novo = { id: proximoId++, nome, email, senha };
    usuarios.push(novo);
    return novo;
  }
};

export default UsuarioModel;

