const { Router } = require('express');

const invalidRouter = (req, res) => {
  return res.status(400).json({ message: 'Requisição inválida!' });
};

const router = Router();

router.use('/', invalidRouter);

module.exports = router;
