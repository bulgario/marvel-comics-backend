class ComicController {
  async index(req, res, next) {
    const { marvel } = req;
    const { offset } = req.query;

    marvel
      .findAllComics({
        offset,
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
    const { marvel } = req;
    const { id } = req.params;
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
