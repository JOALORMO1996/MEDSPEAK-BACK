const pool = require('../../config/db');


const getPacientes = async () => {
    const query = 'SELECT * FROM pacientes ORDER BY id DESC';
    const response = await pool.query(query);
    return response.rows;
  };

  const pacientePorId = async (id) => {
    const query = 'SELECT id, identificacion, nombre, apellido, fecha_nacimiento, telefono, direccion, correo, estado FROM pacientes WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0]; // Devuelve el primer resultado encontrado
  };

  const pacientePorCorreo = async (correo) => {
    const query = 'SELECT id, identificacion, nombre, apellido, fecha_nacimiento, telefono, direccion, correo, estado FROM pacientes WHERE correo = $1';
    const result = await pool.query(query, [correo]);
    return result.rows[0]; 
  };

  const pacientePorIdentificacion = async (identificacion) => {
    const query = 'SELECT id, identificacion, nombre, apellido, fecha_nacimiento, telefono, direccion, correo, estado FROM pacientes WHERE identificacion = $1';
    const result = await pool.query(query, [identificacion]);
    return result.rows[0]; 
  };
  

  const crearPaciente = async (paciente) => {
    try{
      const { identificacion, nombre, apellido, fecha_nacimiento, telefono, direccion, correo } = paciente;
      const query = 'INSERT INTO pacientes (identificacion, nombre, apellido, fecha_nacimiento, telefono, direccion, correo) VALUES ($1, $2, $3, $4, $5, $6, $7)';
      const values = [identificacion, nombre, apellido, fecha_nacimiento, telefono, direccion, correo];
      await pool.query(query, values);
    }
    catch (error) { 
      console.error('Error al crear el paciente:', error);
      throw error; 
    }
  };

  const editarPaciente = async (paciente) => {
    try {
      const {id, identificacion, nombre, apellido, fecha_nacimiento, telefono, direccion, correo } = paciente;
      const query = 'UPDATE pacientes SET identificacion=$2, nombre=$3, apellido=$4, fecha_nacimiento=$5, telefono=$6, direccion=$7, correo=$8 WHERE id = $1';
      const values = [id, identificacion, nombre, apellido, fecha_nacimiento, telefono, direccion, correo];
      await pool.query(query, values);
    } catch (error) { 
      console.error('Error al actualizar el paciente:', error);
      throw error; 
    }
  };

  const inactivarPaciente = async(id) => {
    try{
    const query = 'UPDATE pacientes SET estado = $2 WHERE id = $1';
    const values = [id, false];
      await pool.query(query, values);
    }catch (error) { 
      console.error('Error al actualizar el paciente:', error);
      throw error; 
    }
  };

  const activarPaciente = async(id) => {
    try{
    const query = 'UPDATE pacientes SET estado = $2 WHERE id = $1';
    const values = [id, true];
      await pool.query(query, values);
    }catch (error) { 
      console.error('Error al actualizar el paciente:', error);
      throw error; 
    }
  };
  

module.exports = {
    getPacientes,
    pacientePorId,
    pacientePorCorreo,
    pacientePorIdentificacion,
    crearPaciente,
    editarPaciente,
    inactivarPaciente,
    activarPaciente
  };
  