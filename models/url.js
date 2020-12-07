const t = require('tcomb');

const Url = t.struct(
  {
    type: t.String,
    url: t.String,
  },
  'Url'
);

module.exports = Url;
