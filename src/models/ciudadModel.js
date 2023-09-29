const pool = require('../../config/db');

const getCiudadesPorDepartamento = async (departamentoId) => {
    const query = 'SELECT id_ciudad, nombre_ciudad FROM ciudades WHERE id_departamento = $1';
    const values = [departamentoId]; // El ID del departamento deseado
    const response = await pool.query(query, values);
    return response.rows;
  }

module.exports = {
    getCiudadesPorDepartamento
  };