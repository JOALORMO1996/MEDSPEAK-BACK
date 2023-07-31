const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./src/routes/usuarioRoutes.js');
const autenticacionRoutes = require('./src/routes/autenticacionRoutes.js');
const rolRoutes = require('./src/routes/rolRoutes.js');
const pacienteRoutes = require('./src/routes/pacienteRoutes.js');
const dotenv = require('dotenv');
const db = require('./config/db.js');

// Configura las variables de entorno desde el archivo .env
dotenv.config({ path: '.env' });

// Crear la app
const app = express();

// Middleware de CORS
app.use(cors());
// middlewares adicionales
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Añadir la conexión a la base de datos al objeto request
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routing
app.use(usuarioRoutes);
app.use(autenticacionRoutes);
app.use(rolRoutes);
app.use(pacienteRoutes);


// Definir un puerto y arrancar el proyecto
const port = 3000;

app.listen(port, () => {
  console.log(`El servidor está funcionando en el puerto ${port}`);
});
