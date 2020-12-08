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

// USER
router.get('/user', User.user);
router.get('/user/:id', User.userById);

// MARVEL API
router.get('/characters', CharacterController.index);
router.get('/characters/:id', CharacterController.singleCharacter);
router.get('/comics', ComicController.index);
router.get('/comics/:id', ComicController.singleComic);

// POST METHODS

// FAVORITE COMICS
router.post(
  '/add/favorite/comic',
  userAuthenticated.mandatory,
  Favorite.addFavoriteComic
);

// FAVORITE CHARACTERS
router.post(
  '/add/favorite/character',
  userAuthenticated.mandatory,
  Favorite.addFavoriteCharacter
);

// REGISTER
router.post('/cadastro', User.register);

// LOGIN
router.post('/user/login', LoginUser.login);

// EDIT USER
router.put('/user/edit', userAuthenticated.mandatory, User.edit);

router.use('/', invalidRouter);

module.exports = router;
