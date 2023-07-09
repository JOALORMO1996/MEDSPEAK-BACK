const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: '5432',
  user: 'postgres',
  password: '4258',
  database: 'MedSpeak'
});
// Validar la conexión a la base de datos
(async () => {
  try {
    const client = await pool.connect();
    console.log('***CONEXION CORRECTA***');
    client.release();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
  }
})();
module.exports = pool;