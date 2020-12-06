const jwt = require('jsonwebtoken');

const authenticateToken = (result) => {
  const token = jwt.sign(
    {
      id_usuario: result[0].id,
      nome: result[0].nome,
      sobrenome: result[0].sobrenome,
      email: result[0].email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1h',
    }
  );

  return token;
};

module.exports = authenticateToken;
