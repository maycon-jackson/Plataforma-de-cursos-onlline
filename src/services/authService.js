import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UsuarioModel from '../models/usuarioModel.js';
import { SEGREDO_JWT } from '../middlewares/authMiddleware.js';

const AuthService = {
  async cadastrar({ nome, email, senha }) {
    if (!nome) throw { status: 400, message: 'Campo obrigatório ausente: nome' };
    if (!email) throw { status: 400, message: 'Campo obrigatório ausente: email' };
    if (!senha) throw { status: 400, message: 'Campo obrigatório ausente: senha' };

    if (UsuarioModel.buscarPorEmail(email)) {
      throw { status: 400, message: 'E-mail já cadastrado' };
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const usuario = UsuarioModel.criar({ nome, email, senha: senhaHash });
    return { id: usuario.id, nome: usuario.nome, email: usuario.email };
  },

  async login({ email, senha }) {
    const usuario = UsuarioModel.buscarPorEmail(email);
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      throw { status: 401, message: 'E-mail ou senha incorretos' };
    }

    const token = jwt.sign({ id: usuario.id }, SEGREDO_JWT, { expiresIn: '1d' });
    return {
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
    };
  },

  perfil(usuarioId) {
    const usuario = UsuarioModel.buscarPorId(usuarioId);
    if (!usuario) throw { status: 401, message: 'Token ausente ou inválido' };
    return { id: usuario.id, nome: usuario.nome, email: usuario.email };
  }
};

export default AuthService;

