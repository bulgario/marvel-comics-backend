if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const notFoundRouter = (req, res) => {
  return res.status(404).json({ message: 'Recurso não encontrado!' });
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

app.use(require('./routes/routes'));

app.use(notFoundRouter);

module.exports = app;
