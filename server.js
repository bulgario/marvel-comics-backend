if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const marvel = require('./middleware/marvel-middleware');

const app = express();

const notFoundRouter = (req, res) => {
  return res.status(404).json({ message: 'Recurso não encontrado!' });
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(cors());
app.use(marvel());
app.use(require('./routes/routes'));

app.use(notFoundRouter);

app.listen(process.env.PORT || 4000);

module.exports = app;
