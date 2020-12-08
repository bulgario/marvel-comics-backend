const t = require('tcomb');

const Url = require('./url');
const Image = require('./image');
const CharacterList = require('./character-list');

const Comic = t.struct(
  {
    id: t.Number,
    digitalId: t.Number,
    title: t.String,
    issueNumber: t.Number,
    variantDescription: t.String,
    description: t.maybe(t.String),
    modified: t.String,
    isbn: t.String,
    upc: t.String,
    diamondCode: t.String,
    ean: t.String,
    issn: t.String,
    format: t.String,
    pageCount: t.Number,
    textObjects: t.list(t.Object),
    resourceURI: t.String,
    urls: t.list(Url),
    series: t.Object,
    variants: t.list(t.Object),
    collections: t.list(t.Object),
    collectedIssues: t.list(t.Object),
    dates: t.list(t.Object),
    prices: t.list(t.Object),
    thumbnail: Image,
    images: t.list(Image),
    creators: t.Object,
    characters: CharacterList,
    stories: t.Object,
    events: t.Object,
  },
  'Comic'
);

Comic.getMarvelUrl = (comic) => {
  return comic.urls.find((url) => {
    return url.type === 'detail';
  }).url;
};

Comic.hasDescription = (comic) => {
  return comic.description && comic.description.length > 0;
};

Comic.hasCharacters = (comic) => {
  return comic.characters.available > 0;
};

Comic.getCharacters = (comic) => {
  return comic.characters.items;
};

module.exports = Comic;
