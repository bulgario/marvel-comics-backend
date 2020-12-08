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

router.post(
  '/add/favorite/comic',
  userAuthenticated.mandatory,
  Favorite.addFavoriteComic
);

router.post(
  '/add/favorite/character',
  userAuthenticated.mandatory,
  Favorite.addFavoriteCharacter
);

// DELETE METHODS

router.delete(
  '/delete/favorite/comic',
  userAuthenticated.mandatory,
  Favorite.removeFavoriteComic
);

router.delete(
  '/delete/favorite/character',
  userAuthenticated.mandatory,
  Favorite.removeFavoriteCharacter
);

router.post('/cadastro', User.register);

router.post('/user/login', LoginUser.login);

router.put('/user/edit', userAuthenticated.mandatory, User.edit);

router.use('/', invalidRouter);

module.exports = router;
