const { verifyToken } = require('../helpers/generarToken');
const UsuarioModel = require('../models/usuarioModel');

const roleMiddleware = (rol) => {
  return async (req, res, next) => {
    // Obtener el token de la cabecera de la solicitud
    const token = req.headers.authorization.split(' ').pop();

    if (!token) {
      return res.status(401).json({ mensaje: 'Token de autenticación no proporcionado' });
    }

    try {
      // Verificar y decodificar el token utilizando la función verifyToken
      const decodedToken = await verifyToken(token);

      if (!decodedToken) {
        return res.status(401).json({ mensaje: 'Token de autenticación inválido' });
      }

      // Obtener el ID del usuario desde el token decodificado
      const usuarioId = decodedToken.id;

      // Realizar la consulta a la base de datos para obtener el rol del usuario
      const usuario = await UsuarioModel.usuarioPorId(usuarioId);

      // Verificar el rol del usuario
      if (!usuario || !rol.includes(usuario.rol_id)) {
        return res.status(403).json({ mensaje: 'Acceso denegado' });
        
      }

      // Pasar al siguiente middleware o ruta
      next();
    } catch (error) {
      return res.status(401).json({ mensaje: 'Token de autenticación inválido' });
    }
  };
};

module.exports = roleMiddleware;
