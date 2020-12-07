const { Router } = require('express');
const userAuthenticated = require('../middleware/login');

const invalidRouter = (req, res) => {
  return res.status(400).json({ message: 'Requisição inválida!' });
};

const User = require('../controllers/UserController');
const LoginUser = require('../controllers/LoginController');
const CharacterController = require('../controllers/CharacterController');
const ComicController = require('../controllers/ComicController');
const Favorite = require('../controllers/FavoriteController');

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
router.post('/add/favorite/comic', (req, res, next) => {
  Favorite.addFavoriteComic(req, res);
});

// FAVORITE CHARACTERS
router.post('/add/favorite/character', (req, res, next) => {
  Favorite.addFavoriteCharacter(req, res);
});

// MARVEL API
router.get('/characters', CharacterController.index);
router.get('/characters/:id', CharacterController.singleCharacter);
router.get('/comics', ComicController.index);
router.get('/comics/:id', ComicController.singleComic);

router.use('/', invalidRouter);

module.exports = router;
