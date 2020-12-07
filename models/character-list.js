const t = require('tcomb');

const CharacterSummary = require('./comic-summary');

const CharacterList = t.struct(
  {
    available: t.Number,
    returned: t.Number,
    collectionURI: t.String,
    items: t.list(CharacterSummary),
  },
  'CharacterList'
);

module.exports = CharacterList;
