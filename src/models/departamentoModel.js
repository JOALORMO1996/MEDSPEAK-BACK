const pool = require('../../config/db');

const getDepartamentos= async () => {
    const query = 'SELECT id_departamento, nombre_departamento FROM departamentos';
    const response = await pool.query(query);
    return response.rows;
}

module.exports = {
    getDepartamentos
  };