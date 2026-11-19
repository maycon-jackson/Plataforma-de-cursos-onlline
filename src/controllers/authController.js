import AuthService from '../services/authService.js';

const AuthController = {
  async cadastrar(req, res) {
    try {
      const usuario = await AuthService.cadastrar(req.body);
      return res.status(201).json(usuario);
    } catch (err) {
      return res.status(err.status || 500).json({ erro: err.message });
    }
  },

  async login(req, res) {
    try {
      const resultado = await AuthService.login(req.body);
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(err.status || 500).json({ erro: err.message });
    }
  },

  perfil(req, res) {
    try {
      const usuario = AuthService.perfil(req.usuario.id);
      return res.status(200).json(usuario);
    } catch (err) {
      return res.status(err.status || 500).json({ erro: err.message });
    }
  }
};

export default AuthController;

