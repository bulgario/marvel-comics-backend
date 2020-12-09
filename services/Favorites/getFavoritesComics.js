const getFavoritesComics = (results, marvel) => {
  results.map(async (data) => {
    const comic = await marvel.findComic(data.id_api);
    return comic;
  });
};
module.exports = getFavoritesComics;
