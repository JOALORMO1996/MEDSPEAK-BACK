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
    res.json({ mensaje: 'Usuario creado correctamente.' });
  } catch (e) {
    httpError(res, e);
    console.log(e)
  }
};



const editarUsuario = async (req, res) => {
  try {
    const { id } = req.params; 
    const { identificacion, nombre, apellido, telefono, direccion, correo, contrasenia, rol_id } = req.body;

    // Verificar si el usuario existe en la base de datos
    const usuarioExistente = await UsuarioModel.usuarioPorId(id);
  
    if (!usuarioExistente) {
      return res.status(404).json({ mensaje: 'El usuario no se encuentra en el sistema.'});
    }

    // Verificar si ya existe otro usuario con el mismo Correo
    const correoExistente = await UsuarioModel.usuarioPorCorreo(correo);
    // Verificar que el correo existente sea diferente del correo a actualizar
    if (correoExistente && correoExistente.id != id) {
      return res.status(409).json({ mensaje: 'El correo electrónico ya se encuentra registrado en el sistema.'});
    }

    // Generar el hash de la nueva contraseña (si se proporciona)
    let hashContrasenia;
    if (contrasenia) {
      hashContrasenia = await bcrypt.hash(contrasenia, 10);
    }

    // Crear un objeto con los campos actualizados del usuario
    const usuarioActualizado = {
      id,
      identificacion,
      nombre,
      apellido,
      telefono,
      direccion,
      correo,
      // Si se proporcionó una nueva contraseña, agregarla al objeto actualizado
      ...(hashContrasenia && { contrasenia: hashContrasenia }),
      rol_id,
    };

    // Actualizar el usuario en la base de datos
    await UsuarioModel.editarUsuario(usuarioActualizado);
    
    
    res.json({ mensaje: 'Usuario actualizado correctamente.' });
  } catch (e) {
   
    console.error(e);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
  }
};

const inactivarUsuario = async( req, res) => {
  const { id } = req.params;
  try {
    await UsuarioModel.inactivarUsuario(id);
    res.json({ mensaje: 'Usuario inactivado correctamente' });
  } catch (error) {
    console.error('Error al inactivar el usuario:', error);
    res.status(500).json({ mensaje: 'Error al inactivar el usuario' });
  }
};

const activarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await UsuarioModel.activarUsuario(id);
    res.json({ mensaje: 'Usuario activado correctamente' });
  } catch (error) {
    console.error('Error al activar el usuario:', error);
    res.status(500).json({ mensaje: 'Error al activar el usuario' });
  }
};

module.exports = {
  getUsuario,
  usuarioPorId,
  usuarioPorCorreo,
  crearUsuario,
  editarUsuario,
  inactivarUsuario,
  activarUsuario
};
