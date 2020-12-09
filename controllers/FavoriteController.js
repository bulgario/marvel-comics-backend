const connection = require('../connection');
const getFavoritesComics = require('../services/Favorites/getFavoritesComics');

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

  async removeFavoriteComic(req, res, next) {
    const { id_comic } = req.body;
    const query = `DELETE FROM FavoriteComic WHERE id = ?`;
    connection.query(query, [id_comic], (error) => {
      if (error) {
        return res.status(500).send({ error, message: 'Comic não encontrada' });
      }
      const response = { message: 'Comic deletada com sucesso!' };
      return res.status(201).send(response);
    });
  }

  async allComic(req, res, next) {
    const { id_user } = req.query;
    const { marvel } = req;
    const query = `SELECT * FROM FavoriteComic WHERE id_user = ?;`;
    connection.query(query, [id_user], async (error, result) => {
      if (error) {
        return res.status(500).send({ error, message: 'Comic não encontrada' });
      }

      return res.status(201).send(await getFavoritesComics(result, marvel));
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

  async removeFavoriteCharacter(req, res, next) {
    const { id_character } = req.body;
    const query = `DELETE FROM FavoriteCharacter WHERE id = ?`;
    connection.query(query, [id_character], (error) => {
      if (error) {
        return res
          .status(500)
          .send({ error, message: 'Character não encontrada' });
      }
      const response = { message: 'Character deletada com sucesso!' };
      return res.status(201).send(response);
    });
  }
}

module.exports = new FavoriteController();
