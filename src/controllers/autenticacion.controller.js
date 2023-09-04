const { httpError } = require('../helpers/handleError');
const UsuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const {tokenSign} = require('../helpers/generarToken');
const {emailRestablecerPass} = require('../helpers/email');


const login = async (req, res) => {
  try {
    // Obtener el correo y contraseña desde el cuerpo de la solicitud
    const { correo, contrasenia } = req.body;

    // Buscar el usuario en la base de datos por correo electrónico
    const usuario = await UsuarioModel.usuarioPorCorreo(correo);
   
    // Si el usuario no existe, enviar un mensaje de error
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if(usuario.estado == false){
      return res.status(404).json({ mensaje: 'El usuario no se encuentra activo, por favor comuniquese con el administrador' });
    }
    // Verificar la contraseña
    const contrasenaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);

    // Si la contraseña no es válida, enviar un mensaje de error
    if (!contrasenaValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generar un token 
     const token = await tokenSign(usuario);

    // Enviar la respuesta con el token de acceso
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

//Enviar correo de recuperacion de contraseña
const sendRecoveryEmail = async (req, res) => {
  const { correo } = req.body;
  
  try{

    const usuario = await UsuarioModel.usuarioPorCorreo(correo);
    if(!usuario){
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const token = await tokenSign(usuario);
    const expiration = new Date(Date.now() + 3600000);
    
    const resetUrl = `http://localhost:4200/restablecerContrasenia/${token}`;

   await UsuarioModel.insertPasswordResetToken(usuario.id, token, expiration);     

   const asunto = 'Recuperación de Contraseña';
   const mensaje = `Hola ${usuario.nombre}, haz solicitado un enlace para cambiar tu contraseña. Haz clic en el enlace para continuar <a href="${resetUrl}">${resetUrl}</a>`;
   
    // Envía el correo con el enlace que contiene el token
    await emailRestablecerPass(usuario.correo, asunto, mensaje);

    res.json({ mensaje: 'Solicitud de recuperación de contraseña enviada, por favor revisa tu correo y sigue los pasos' });
    } catch (error) {
      console.error('Error al enviar el correo de recuperación', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };




  //formato de contrasenia
  const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
    return passwordRegex.test(password);
  };





//restablecer contrasenia
  const resetPassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { contrasenia } = req.body;
  
      const tokenData = await UsuarioModel.getToken(token);
      if (!tokenData) {
        return res.status(404).json({ mensaje: 'El enlace para restablecer la contraseña no es válido. Por favor, asegúrate de usar el enlace correcto y si es necesario, realiza una nueva solicitud para restablecer tu contraseña.' });
      }
  
      if (tokenData.expiration < new Date()) {
        return res.status(400).json({ mensaje: 'El enlace para restablecer la contraseña ha expirado. Por favor, realiza una nueva solicitud para restablecer tu contraseña.' });
      }

       //Verifica si la contraseña cumple los requisitos
 if (!isStrongPassword(contrasenia)) {
      return res.status(409).json({ mensaje: 'La contraseña debe tener al menos 6 caracteres e incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.' });
    }
  

      const usuarioId = tokenData.user_id;
      
      const hashContrasenia = await bcrypt.hash(contrasenia, 10);

      await UsuarioModel.editarContrasenia(usuarioId, hashContrasenia);
      res.json({ mensaje: 'Contraseña restablecida exitosamente' });
     //Se elimina el token
      await UsuarioModel.eliminarToken(tokenData.id);

    } catch (error) {
      console.error('Error al restablecer la contraseña', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };

module.exports = { 
  login,
  sendRecoveryEmail,
  resetPassword
 };
