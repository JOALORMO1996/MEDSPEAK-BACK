const {httpError} = require('../helpers/handleError');
const departamentoModel = require('../models/departamentoModel');


const getDepartamento = async (req, res) => {
    try {
      const departamentos = await departamentoModel.getDepartamentos();
      res.status(200).json(departamentos);
    } catch (e) {
      console.error(error);
      httpError(res, e);
    }
  };

  module.exports = {
    getDepartamento
  };
  