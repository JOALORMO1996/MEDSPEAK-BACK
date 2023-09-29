const {httpError} = require('../helpers/handleError');
const ciudadModel = require('../models/ciudadModel');


const getCiudadesPorDepartamento = async (req, res) => {
  try {
    const { departamentoId } = req.params; 
    const ciudades = await ciudadModel.getCiudadesPorDepartamento(departamentoId);
    res.status(200).json(ciudades);
  } catch (e) {
    console.error(e);
    httpError(res, e);
  }
  };

  module.exports = {
    getCiudadesPorDepartamento
  };
  