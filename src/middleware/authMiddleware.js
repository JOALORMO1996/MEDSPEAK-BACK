const jwt = require('jsonwebtoken');
const { verifyToken } = require('../helpers/generarToken');

const authMiddleware = async (req, res, next) => {
  // Obtener el token de la cabecera de la solicitud
  const token = req.headers.authorization.split(' ').pop();

  if (!token) {
    return res.status(401).json({ mensaje: 'Token de autenticación no proporcionado' });
  }

  try {
    // Verificar el token
    const decodedToken = await verifyToken(token);
    if (!decodedToken) {
      return res.status(401).json({ mensaje: 'Token de autenticación inválido' });
    }

    // Asignar los datos del usuario decodificado a la solicitud
    req.usuario = decodedToken;

    // Pasar al siguiente middleware o ruta
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token de autenticación inválido' });
  }
};

module.exports = authMiddleware;
