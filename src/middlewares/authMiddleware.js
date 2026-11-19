import jwt from 'jsonwebtoken';

export const SEGREDO_JWT = 'chave_secreta_web2';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ erro: 'Token ausente ou inválido' });
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = jwt.verify(token, SEGREDO_JWT);
    req.usuario = { id: decoded.id };
    return next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token ausente ou inválido' });
  }
}

