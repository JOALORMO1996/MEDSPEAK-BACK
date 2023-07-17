const jwt = require('jsonwebtoken');

const tokenSign = async (usuario) => {
    return await jwt.sign(
      {
        id: usuario.id,
        rol: usuario.rol_id
      },
      'secreto',
      {
        expiresIn: '2h'
      }
    );
  };

  const verifyToken = async (token) => {
    try {
      return await jwt.verify(token, 'secreto');
    } catch (error) {
      return null;
    }
  };

module.exports = { tokenSign, verifyToken };
