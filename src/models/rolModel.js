const pool = require('../../config/db');

const getRoles= async () => {
    const query = 'SELECT id_rol, nombre_rol FROM roles';
    const response = await pool.query(query);
    return response.rows;
}

module.exports = {
    getRoles
  };