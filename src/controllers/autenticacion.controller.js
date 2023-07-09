const { httpError } = require('../helpers/handleError');
const UsuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    // Obtener el correo y contraseña desde el cuerpo de la solicitud
    const { correo, contrasenia } = req.body;

    // Buscar el usuario en la base de datos por correo electrónico
    const usuarioEncontrado = await UsuarioModel.usuarioPorCorreo(correo);

    // Si el usuario no existe, enviar un mensaje de error
    if (!usuarioEncontrado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const contrasenaValida = await bcrypt.compare(contrasenia, usuarioEncontrado.contrasenia);

    // Si la contraseña no es válida, enviar un mensaje de error
    if (!contrasenaValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generar un token de acceso utilizando JSON Web Tokens (JWT)
    const token = jwt.sign({ correo: usuarioEncontrado.correo }, 'secreto', { expiresIn: '1h' });

    // Enviar la respuesta con el token de acceso
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { login };
