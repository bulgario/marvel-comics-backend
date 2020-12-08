/* eslint-disable no-underscore-dangle */
const crypto = require('crypto');
const fetch = require('node-fetch');
const queryString = require('query-string');

const Pagination = require('../../models/pagination');
const Character = require('../../models/character');
const Comic = require('../../models/comic');

function Marvel() {
  this.publicKey = process.env.MARVEL_PUBLIC_KEY || '';
  this.privateKey = process.env.MARVEL_PRIVATE_KEY || '';
}

Marvel.prototype.findAllCharacters = function (options) {
  const self = this;
  options = options || {};
  const ts = this._timestamp();
  const limit = typeof options.limit !== 'undefined' ? options.limit : 20;
  const offset = typeof options.offset !== 'undefined' ? options.offset : 0;

  const qs = queryString.stringify({
    ts,
    apikey: this.publicKey,
    hash: this._createHash(ts),
    limit,
    offset,
  });
  const url = `http://gateway.marvel.com/v1/public/characters?${qs}`;

  return fetch(url)
    .then((res) => {
      if (res.status !== 200) {
        return self._handleError(res);
      }

      return res.json();
    })
    .then((body) => {
      const pagination = Pagination(body.data);
      const characters = body.data.results.map((payload) => {
        return Character(payload);
      });

      return {
        pagination,
        characters,
      };
    });
};

Marvel.prototype.findCharacter = function (id) {
  const self = this;
  const ts = this._timestamp();

  const qs = queryString.stringify({
    ts,
    apikey: this.publicKey,
    hash: this._createHash(ts),
  });

  const url = `http://gateway.marvel.com/v1/public/characters/${id}?${qs}`;

  return fetch(url)
    .then((res) => {
      if (res.status !== 200) {
        return self._handleError(res);
      }
      return res.json();
    })
    .then((body) => {
      const character = Character(body.data.results[0]);
      return {
        character,
      };
    });
};

Marvel.prototype.findAllComics = function (options) {
  const self = this;
  options = options || {};
  const ts = this._timestamp();
  const limit = typeof options.limit !== 'undefined' ? options.limit : 20;
  const offset = typeof options.offset !== 'undefined' ? options.offset : 0;

  const qs = queryString.stringify({
    ts,
    apikey: this.publicKey,
    hash: this._createHash(ts),
    limit,
    offset,
  });
  const url = `http://gateway.marvel.com/v1/public/comics?${qs}`;

  return fetch(url)
    .then((res) => {
      if (res.status !== 200) {
        return self._handleError(res);
      }

      return res.json();
    })
    .then((body) => {
      const pagination = Pagination(body.data);
      const comics = body.data.results.map((payload) => {
        return Comic(payload);
      });

      return {
        pagination,
        comics,
      };
    });
};

Marvel.prototype.findComic = function (id) {
  const self = this;
  const ts = this._timestamp();

  const qs = queryString.stringify({
    ts,
    apikey: this.publicKey,
    hash: this._createHash(ts)
  });
  const url = `http://gateway.marvel.com/v1/public/comics/${id}?${qs}`;

  return fetch(url)
    .then((res) => {
      if (res.status !== 200) {
        return self._handleError(res);
      }

      return res.json();
    })
    .then((body) => {
      const comic = Comic(body.data.results[0]);

      return {
        comic,
      };
    });
};

Marvel.prototype._createHash = function (ts) {
  const content = ts + this.privateKey + this.publicKey;
  const hash = crypto.createHash('md5').update(content).digest('hex');

  return hash;
};

Marvel.prototype._timestamp = function () {
  return parseInt(Date.now() / 1000, 10);
};

Marvel.prototype._handleError = function (res) {
  return res.text().then((bodyText) => {
    const message = `${res.status} ${res.statusText} ${bodyText}`;
    const error = new Error(message);
    error.status = res.status;
    throw error;
  });
};

module.exports = Marvel;
