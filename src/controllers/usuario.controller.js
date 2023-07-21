const {httpError} = require('../helpers/handleError');
const UsuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcrypt');

const getUsuario = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.getUsuarios();
    res.status(200).json(usuarios);
  } catch (e) {
    console.error(error);
    httpError(res, e);
  }
};

const usuarioPorId = async (req, res) => {
  try {
    const id = req.params.id;
   const usuario = await UsuarioModel.usuarioPorId(id);
   if (!usuario) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  res.json(usuario);

  } catch (e) {
    httpError(res, e);
  }
};

const usuarioPorCorreo = async (req, res) => {
  try {
    const correo = req.params.correo;
    const usuarioCorreo = await UsuarioModel.usuarioPorCorreo(correo);
    if (!usuarioCorreo) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuarioCorreo);
  } catch (e) {
    httpError(res, e);
  }
};

const crearUsuario = async (req, res) => {
  try {
    const { identificacion, nombre, apellido, telefono, direccion, correo, contrasenia, rol_id } = req.body;

 // Verificar si ya existe un usuario con el mismo ID
 const usuarioExistente = await UsuarioModel.usuarioPorIdentificacion(identificacion);
 if (usuarioExistente) {
   return res.status(409).json({ mensaje: 'El usuario ya se encuentra registrado en el sistema.'});
 }
    // Verificar si ya existe un usuario con el mismo Correo
    const correoExistente = await UsuarioModel.usuarioPorCorreo(correo);
    if (correoExistente) {
      return res.status(409).json({ mensaje: 'El correo electronico ya se encuentra registrado en el sistema.'});
    }

      // Generar el hash de la contraseña
      const hashContrasenia = await bcrypt.hash(contrasenia, 10);

      const usuario = {
        identificacion,
        nombre,
        apellido,
        telefono,
        direccion,
        correo,
        contrasenia: hashContrasenia,
        rol_id
      };
    await UsuarioModel.crearUsuario(usuario);
    res.json({ mensaje: 'Usuario creado exitosamente' });
  } catch (e) {
    httpError(res, e);
    console.log(e)
  }
};



module.exports = {
  getUsuario,
  usuarioPorId,
  usuarioPorCorreo,
  crearUsuario
};
