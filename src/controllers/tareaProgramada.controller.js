const cron = require('node-cron');
const UsuarioModel = require('../models/usuarioModel');


const startTaskScheduler = () => {
  // Define la tarea programada para ejecutarse cada día a la medianoche
  cron.schedule('0 0 * * *', async () => {
    try {
      // Lógica para eliminar tokens expirados usando UsuarioModel
      await UsuarioModel.eliminarTokensExpirados();
      console.log('Tarea programada ejecutada: Eliminar tokens expirados');
    } catch (error) {
      console.error('Error al ejecutar la tarea programada', error);
    }
  });
};

module.exports = {
  startTaskScheduler,
};