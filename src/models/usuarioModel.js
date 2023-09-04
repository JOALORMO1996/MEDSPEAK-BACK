const pool = require('../../config/db');

const getUsuarios = async () => {
  const query = 'SELECT u.*, r.nombre_rol FROM usuarios u INNER JOIN roles r ON u.rol_id = r.id_rol ORDER BY u.estado DESC, u.id DESC';
  const response = await pool.query(query);
  return response.rows;
};

const usuarioPorId = async (id) => {
  const query = 'SELECT id, identificacion, nombre, apellido, telefono, direccion, correo, rol_id, estado  FROM usuarios WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0]; // Devuelve el primer resultado encontrado
};

const usuarioPorCorreo = async (correo) => {
  const query = 'SELECT id, identificacion, nombre, apellido, telefono, direccion, correo, contrasenia, rol_id, estado  FROM usuarios WHERE correo = $1';
  const result = await pool.query(query, [correo]);
  return result.rows[0]; 
};

const usuarioPorIdentificacion = async (identificacion) => {
  const query = 'SELECT id, identificacion, nombre, apellido, telefono, direccion, correo, rol_id, estado  FROM usuarios WHERE identificacion = $1';
  const result = await pool.query(query, [identificacion]);
  return result.rows[0]; 
};


const crearUsuario = async (usuario) => {
  try{
    const { identificacion, nombre, apellido, telefono, direccion, correo, contrasenia, rol_id } = usuario;
    const query = 'INSERT INTO usuarios (identificacion, nombre, apellido, telefono, direccion, correo, contrasenia, rol_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [identificacion, nombre, apellido, telefono, direccion, correo, contrasenia, rol_id];
    await pool.query(query, values);
  }
  catch (error) { 
    console.error('Error al crear el usuario:', error);
    throw error; 
  }
};

const editarUsuario = async (usuario) => {
  try {
    const {id, identificacion, nombre, apellido, telefono, direccion, correo, contrasenia, rol_id } = usuario;
    const query = 'UPDATE usuarios SET identificacion = $2, nombre = $3, apellido = $4, telefono = $5, direccion = $6, correo = $7, contrasenia = $8, rol_id = $9 WHERE id = $1';
    const values = [id, identificacion, nombre, apellido, telefono, direccion, correo, contrasenia, rol_id];
    await pool.query(query, values);
  } catch (error) { 
    console.error('Error al actualizar el usuario:', error);
    throw error; 
  }
};

const inactivarUsuario = async(id) => {
  try{
  const query = 'UPDATE usuarios SET estado = $2 WHERE id = $1';
  const values = [id, false];
    await pool.query(query, values);
  }catch (error) { 
    console.error('Error al actualizar el usuario:', error);
    throw error; 
  }
};

const activarUsuario = async(id) => {
  try{
  const query = 'UPDATE usuarios SET estado = $2 WHERE id = $1';
  const values = [id, true];
    await pool.query(query, values);
  }catch (error) { 
    console.error('Error al actualizar el usuario:', error);
    throw error; 
  }
};

const insertPasswordResetToken = async (usuarioId, token, expiration) => {
  try {
    const query = 'INSERT INTO password_reset_tokens (user_id, token, expiration) VALUES ($1, $2, $3)';
    const values = [usuarioId, token, expiration];
    await pool.query(query, values);
  } catch (error) {
    console.error('Error al insertar el token de restablecimiento:', error);
    throw error;
  }
};

const getToken = async (token) => {
  const query = 'SELECT id, user_id, token, expiration FROM password_reset_tokens WHERE token = $1';
  const result = await pool.query(query, [token]);
  return result.rows[0]; 
};
const editarContrasenia = async (usuarioId, contrasenia) => {
  try {
    const query = 'UPDATE usuarios SET contrasenia = $2 WHERE id = $1';
    const values = [usuarioId, contrasenia];
    await pool.query(query, values);
  } catch (error) { 
    console.error('Error al actualizar la contraseña:', error);
    throw error; 
  }
};

const eliminarToken = async (tokenId) => {
  try {
    const query = 'DELETE FROM password_reset_tokens WHERE id = $1';
     await pool.query(query, [tokenId]);
  } catch (error) {
    console.error('Error al eliminar el token:', error);
    throw error;
  }
};

const eliminarTokensExpirados = async () => {
  try {
    const currentDate = new Date();
    const query = 'DELETE FROM password_reset_tokens WHERE expiration < $1';
    const values = [currentDate];

    const response = await pool.query(query, values);
    console.log(`${response.rowCount} tokens expirados eliminados.`);
  } catch (error) {
    console.error('Error al eliminar tokens expirados', error);
  }
};
module.exports = {
  getUsuarios,
  usuarioPorId,
  usuarioPorCorreo,
  usuarioPorIdentificacion,
  crearUsuario,
  editarUsuario,
  inactivarUsuario, 
  activarUsuario,
  insertPasswordResetToken,
  getToken,
  editarContrasenia,
  eliminarToken,
  eliminarTokensExpirados
};
