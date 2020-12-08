class CharacterController {
  async index(req, res, next) {
    const { marvel } = req;
    const { offset } = req.query;

    marvel
      .findAllCharacters({
        offset,
      })
      .then((result) => {
        if (result) {
          res.status(200).send({
            characters: result.characters,
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

  async singleCharacter(req, res, next) {
    const { marvel } = req;
    const { id } = req.params;

    marvel
      .findCharacter(id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: 'Personagem não encontrado', error: err });
        next(err);
      });
  }
}

module.exports = new CharacterController();
