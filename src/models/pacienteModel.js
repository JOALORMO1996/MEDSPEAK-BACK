const pool = require('../../config/db');


const getPacientes = async () => {
    const query = 'SELECT p.id, p.identificacion, p.nombre, p.apellido, p.fecha_nacimiento, p.telefono, p.departamento, d.nombre_departamento, p.ciudad, c.nombre_ciudad, p.direccion, p.estado_civil, e.nombre_estado_civil, p.ocupacion, p.asegurador, p.afiliacion, p.correo, p.estado FROM pacientes p ' +
    'INNER JOIN departamentos d ON d.id_departamento = p.departamento ' +
    'INNER JOIN ciudades c ON c.id_ciudad = p.ciudad ' +  
    'INNER JOIN estado_civil e ON e.id_estado_civil = p.estado_civil ORDER BY p.id DESC';
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
      const { identificacion, nombre, apellido, fecha_nacimiento, telefono, departamento, ciudad, direccion, estado_civil, ocupacion, asegurador, afiliacion, correo } = paciente;
      const query = 'INSERT INTO pacientes (identificacion, nombre, apellido, fecha_nacimiento, telefono, departamento, ciudad, direccion, estado_civil, ocupacion, asegurador, afiliacion, correo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
      const values = [identificacion, nombre, apellido, fecha_nacimiento, telefono, departamento, ciudad, direccion, estado_civil, ocupacion, asegurador, afiliacion, correo];
      await pool.query(query, values);
    }
    catch (error) { 
      console.error('Error al crear el paciente:', error);
      throw error; 
    }
  };

  const editarPaciente = async (paciente) => {
    try {
      const {id, identificacion, nombre, apellido, fecha_nacimiento, telefono, departamento, ciudad, direccion, estado_civil, ocupacion, asegurador, afiliacion, correo  } = paciente;
      const query = 'UPDATE pacientes SET identificacion=$2, nombre=$3, apellido=$4, fecha_nacimiento=$5, telefono=$6, departamento=$7, ciudad=$8, direccion=$9, estado_civil=$10, ocupacion=$11, asegurador=$12, afiliacion=$13, correo=$14 WHERE id = $1';
      const values = [id, identificacion, nombre, apellido, fecha_nacimiento, telefono, departamento, ciudad, direccion, estado_civil, ocupacion, asegurador, afiliacion, correo];
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

  const getEstadoCivil = async () => {
    const query = 'SELECT id_estado_civil, nombre_estado_civil FROM estado_civil';
    const response = await pool.query(query);
    return response.rows;
  };
  

module.exports = {
    getPacientes,
    pacientePorId,
    pacientePorCorreo,
    pacientePorIdentificacion,
    crearPaciente,
    editarPaciente,
    inactivarPaciente,
    activarPaciente,
    getEstadoCivil
  };
  