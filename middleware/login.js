const jwt = require('jsonwebtoken');

exports.mandatory = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.usuario = decode;
    if (!decode) {
      return false;
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: 'Falha na verificação da autenticação' });
  }
};

exports.optional = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.usuario = decode;
    next();
  } catch (error) {
    next();
  }
};
