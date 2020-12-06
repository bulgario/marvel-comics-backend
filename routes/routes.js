const { Router } = require('express');

const invalidRouter = (req, res) => {
  return res.status(400).json({ message: 'Requisição inválida!' });
};

const CreateUser = require('../controllers/UserController');
const LoginUser = require('../controllers/LoginController');

const router = Router();
// GET METHODS

router.get('/', (req, res) => {});

// POST METHODS

// REGISTER
router.post('/cadastro', (req, res, next) => {
  CreateUser.register(req, res, next);
});

// LOGIN
router.post('/user/login', (req, res, next) => {
  LoginUser.login(req, res);
});

router.use('/', invalidRouter);

module.exports = router;
