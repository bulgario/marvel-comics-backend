const Marvel = require('../services/Marvel/marvel');

module.exports = () => {
  const marvel = new Marvel();

  return (req, res, next) => {
    req.marvel = marvel;
    next();
  };
};
