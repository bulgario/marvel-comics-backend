const t = require('tcomb');

const Url = require('./url');
const Image = require('./image');
const ComicList = require('./comic-list');

const Character = t.struct(
  {
    id: t.Number,
    name: t.String,
    description: t.maybe(t.String),
    modified: t.String,
    resourceURI: t.String,
    urls: t.list(Url),
    thumbnail: Image,
    comics: ComicList,
    stories: t.Object,
    events: t.Object,
    series: t.Object,
  },
  'Character'
);

Character.getMarvelUrl = (character) => {
  return character.urls.find((url) => {
    return url.type === 'detail';
  }).url;
};

Character.hasDescription = (character) => {
  return character.description && character.description.length > 0;
};

Character.hasComics = (character) => {
  return character.comics.available > 0;
};

Character.getComics = (character) => {
  return character.comics.items;
};

module.exports = Character;
