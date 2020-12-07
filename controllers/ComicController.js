class ComicController {
  async index(req, res, next) {
    const marvel = req.marvel;
    const offset = req.query.offset;

    marvel
      .findAllComics({
        offset: offset,
      })
      .then((result) => {
        if (result) {
          res.status(200).send({
            comics: result.comics,
            pagination: result.pagination,
          });
        }
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: 'Erro ao encontrar personagens', error: err });
      });
  }

  async singleComic(req, res, next) {
    const marvel = req.marvel;
    const id = req.params.id;

    marvel
      .findComic(id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(404).send({ message: 'Comic não encontrado', error: err });

        next(err);
      });
  }
}

module.exports = new ComicController();
