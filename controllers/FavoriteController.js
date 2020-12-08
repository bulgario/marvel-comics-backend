const connection = require('../connection');

class FavoriteController {
  async addFavoriteComic(req, res, next) {
    const { id_user, id_api_comic } = req.body;
    const query = `INSERT INTO FavoriteComic (id_user, id_api) VALUES (?, ?)`;
    connection.query(query, [id_user, id_api_comic], (error) => {
      if (error) {
        return res
          .status(500)
          .send({ error, message: 'Comic já foi favoritada' });
      }
      const response = { message: 'Comic favoritada!' };
      return res.status(201).send(response);
    });
  }

  async addFavoriteCharacter(req, res, next) {
    const { id_user, id_api_comic } = req.body;
    const query = `INSERT INTO FavoriteCharacter (id_user, id_api) VALUES (?, ?)`;
    connection.query(query, [id_user, id_api_comic], (error) => {
      if (error) {
        return res
          .status(500)
          .send({ error, message: 'Character já foi favoritada' });
      }
      const response = { message: 'Character favoritada!' };
      return res.status(201).send(response);
    });
  }
}

module.exports = new FavoriteController();
