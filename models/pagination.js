const t = require('tcomb');

const Pagination = t.struct({
  offset: t.Number,
  limit: t.Number,
  total: t.Number,
  count: t.Number
}, 'Pagination');

Pagination.getStart = (pagination) => {
  return pagination.offset + 1;
};

Pagination.getEnd = (pagination) => {
  return pagination.offset + pagination.count;
};

Pagination.isFirstPage = (pagination) => {
  return (pagination.offset === 0);
};

Pagination.isLastPage = (pagination) => {
  return (Pagination.getEnd(pagination) === pagination.total);
};

Pagination.previousPageOffset = (pagination) => {
  return pagination.offset - pagination.limit;
};

Pagination.nextPageOffset = (pagination) => {
  return pagination.offset + pagination.limit;
};

module.exports = Pagination;
