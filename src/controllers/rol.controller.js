const {httpError} = require('../helpers/handleError');
const rolModel = require('../models/rolModel');


const getRoles = async (req, res) => {
    try {
      const roles = await rolModel.getRoles();
      res.status(200).json(roles);
    } catch (e) {
      console.error(error);
      httpError(res, e);
    }
  };

  module.exports = {
    getRoles
  };
  