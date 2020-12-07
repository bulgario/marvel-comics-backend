const bcrypt = require('bcrypt');
const connection = require('../connection');

class UserController {
  async register(req, res, next) {
    const { nome, sobrenome, email, senha } = req.body;
    bcrypt.hash(senha, 10, (err, hash) => {
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

  async edit(req, res, next) {
    const { nome, sobrenome, email, senhaAntiga, senhaNova } = req.body;
    const senhaAntigaHash = await bcrypt.hash(senhaAntiga, 10);
    const isUser = await connection.query(`SELECT * from Users where email = ? AND senha= ? LIMIT 1`,[email, senhaAntigaHash]);
    if(!isUser) {
      return res.status(500).send({ error: 'Error com senha' });
    }
    const senhaNovaHash = await bcrypt.hash(senhaNova, 10);
    connection.query(
      'UPDATE Users SET nome=?, sobrenome=?, senha=? WHERE email=?',
      [nome, sobrenome, senhaNovaHash, email],
      (error, results) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res
          .status(200)
          .send({ message: 'Dados Alterados com sucesso!' });
      }
    );
  }

  async user(req, res) {
    const { email } = req.query;
    connection.query(
      'SELECT * from Users WHERE email = ?',
      [email],
      (err, data) => {
        try {
          res.status(200).send({
            data: {
              id: data[0].id,
              nome: data[0].nome,
              sobrenome: data[0].sobrenome,
              email: data[0].email,
            },
          });
        } catch (error) {
          res.status(500).send({ error: error });
        }
      }
    );
  }

  async userById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * from Users WHERE id = ?', [id], (err, data) => {
      try {
        res.status(200).send({
          id: data[0].id,
          nome: data[0].nome,
          sobrenome: data[0].sobrenome,
          email: data[0].email,
        });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    });
  }
}

module.exports = new UserController();
