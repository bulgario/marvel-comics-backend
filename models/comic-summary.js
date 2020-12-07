const t = require('tcomb');

const ComicSummary = t.struct(
  {
    resourceURI: t.String,
    name: t.String,
  },
  'ComicSummary'
);

ComicSummary.getId = function (comicSummary) {
  const match = comicSummary.resourceURI.match(/\/comics\/([0-9]+)/);
  if (match && match.length === 2) {
    return parseInt(match[1], 10);
  } else {
    return null;
  }
};

module.exports = ComicSummary;
