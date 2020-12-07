const { Router } = require('express');
const userAuthenticated = require('../middleware/login');

const invalidRouter = (req, res) => {
  return res.status(400).json({ message: 'Requisição inválida!' });
};

const User = require('../controllers/UserController');
const LoginUser = require('../controllers/LoginController');
// const CharacterController = require('../controllers/CharacterController');
// const ComicController = require('../controllers/ComicController');

const router = Router();
// GET METHODS

router.get('/user', (req, res, next) => {
  User.user(req, res);
});

router.get('/user/:id', (req, res, next) => {
  User.userById(req, res);
});

// POST METHODS

// REGISTER
router.post('/cadastro', (req, res, next) => {
  User.register(req, res, next);
});

// LOGIN
router.post('/user/login', (req, res, next) => {
  LoginUser.login(req, res);
});

// EDIT USER
router.put('/user/edit', userAuthenticated.mandatory, (req, res, next) => {
  User.edit(req, res, next);
});

// FAVORITE COMICS
router.post('/add-favorite', userAuthenticated.mandatory, (req, res, next) => {
  User.addFavoriteComics(req, res);
});

// router.get('/characters', CharacterController.index);
// router.get('/characters/:id', CharacterController.show);
// router.get('/comics', ComicController.index);
// router.get('/comics/:id', ComicController.show);

router.use('/', invalidRouter);

module.exports = router;
