const config = require('../config/app');
const Marvel = require('../services/Marvel/marvel');

module.exports = () => {
  const marvel = new Marvel({
    publicKey: config.MARVEL_PUBLIC_KEY,
    privateKey: config.MARVEL_PRIVATE_KEY,
  });

  return (req, res, next) => {
    req.marvel = marvel;
    next();
  };
};
