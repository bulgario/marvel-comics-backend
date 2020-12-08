const bcrypt = require('bcrypt');
const connection = require('../connection');
const authenticateToken = require('../services/Login/loginAuth');

class UserController {
  async login(req, res, next) {
    const { email, senha } = req.body;
    if (email && senha) {
      const query = `SELECT * FROM Users WHERE email=?`;
      connection.query(query, [email], (error, results) => {
        if (error) {
          return res.status(500).send({ error });
        }
        if (results.length < 1) {
          return res.status(401).send({ message: 'Falha na autenticação' });
        }
        const pass = results[0].senha;
        bcrypt.compare(senha, pass, (err, result) => {
          if (err) {
            return res.status(401).send({ message: 'Falha na autenticação' });
          }
          if (result) {
            const token = authenticateToken(results);
            return res.status(200).send({
              message: 'Autenticado com sucesso',
              token,
              id: results[0].id,
              email: results[0].email,
            });
          }
          return res.status(401).send({ message: 'Falha na autenticação' });
        });
      });
    }
  }
}

module.exports = new UserController();
