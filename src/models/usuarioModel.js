const pool = require('../../config/db');

const getUsuarios = async () => {
  const query = 'SELECT u.*, r.nombre_rol FROM usuarios u INNER JOIN roles r ON u.rol_id = r.id_rol ORDER BY u.id DESC';
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

module.exports = {
  getUsuarios,
  usuarioPorId,
  usuarioPorCorreo,
  usuarioPorIdentificacion,
  crearUsuario,
  editarUsuario,
  inactivarUsuario, 
  activarUsuario
};
