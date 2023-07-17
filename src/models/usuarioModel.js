const pool = require('../../config/db');

const getUsuarios = async () => {
  const query = 'SELECT u.*, r.nombre_rol FROM usuarios u INNER JOIN roles r ON u.rol_id = r.id_rol';
  const response = await pool.query(query);
  return response.rows;
};

const usuarioPorId = async (id) => {
  const query = 'SELECT * FROM usuarios WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0]; // Devuelve el primer resultado encontrado
};

const usuarioPorCorreo = async (correo) => {
  const query = 'SELECT * FROM usuarios WHERE correo = $1';
  const result = await pool.query(query, [correo]);
  return result.rows[0]; // Devuelve el primer resultado encontrado
};

const usuarioPorIdentificacion = async (identificacion) => {
  const query = 'SELECT * FROM usuarios WHERE identificacion = $1';
  const result = await pool.query(query, [identificacion]);
  return result.rows[0]; // Devuelve el primer resultado encontrado
};


const crearUsuario = async (usuario) => {
  const { identificacion, nombre, apellido, telefono, direccion, correo, contrasenia, rol_id } = usuario;
  const query = 'INSERT INTO usuarios (identificacion, nombre, apellido, telefono, direccion, correo, contrasenia, rol_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  const values = [identificacion, nombre, apellido, telefono, direccion, correo, contrasenia, rol_id];
  await pool.query(query, values);
};

module.exports = {
  getUsuarios,
  usuarioPorId,
  usuarioPorCorreo,
  usuarioPorIdentificacion,
  crearUsuario
};
