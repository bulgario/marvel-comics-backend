const bcrypt = require('bcrypt');
const connection = require('../connection');

class UserController {
  async register(req, res, next) {
    const { nome, sobrenome, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).send({ error: err });
      connection.query(
        'SELECT * FROM Users WHERE email = ?',
        [email],
        (error, results) => {
          if (error) {
            return res.status(500).send({ error: error });
          }
          if (results.length > 0) {
            res.status(409).send({ message: 'Usuário já cadastrado' });
          } else {
            connection.query(
              `INSERT INTO Users (nome, sobrenome, email, senha) VALUES (?,?,?,?)`,
              [nome, sobrenome, email, hash],
              (error, results) => {
                if (error) {
                  return res.status(500).send({ error: error });
                }
                const response = {
                  message: 'Usuário criado com sucesso!',
                  user: {
                    idUsuario: results.insertId,
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                  },
                };

                return res.status(201).send(response);
              }
            );
          }
        }
      );
    });
  }

  async getUser(req, res) {
    const { email } = req.query;
    connection.query(
      'SELECT * from Users WHERE email = ?',
      [email],
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  }
}

module.exports = new UserController();
