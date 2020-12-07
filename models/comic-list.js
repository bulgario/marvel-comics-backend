const t = require('tcomb');

const ComicSummary = require('./comic-summary');

const ComicList = t.struct(
  {
    available: t.Number,
    returned: t.Number,
    collectionURI: t.String,
    items: t.list(ComicSummary),
  },
  'ComicList'
);

module.exports = ComicList;
