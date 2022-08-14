const mongooseQueryParser = require('mongoose-query-parser');

const ascending = 'asc';
const maxLimit = 1000;

module.exports = {
  getOptions: async (req) => {
    let options = { filter: {} };

    const sort = req?.query?.sort;
    let { page, limit, offset } = req?.query || {};

    // Express does not offer a handy way to get the raw query strings
    // so lets parse it and drop the leading `?` for the parser
    const url = new URL(req.protocol + '://' + req.hostname + req.originalUrl);
    const rawQueryParams = url.search.slice(1);

    const parser = new mongooseQueryParser.MongooseQueryParser({
      blacklist: ['offset', 'page', 'limit', 'sort']
    });
    const parsed = parser.parse(rawQueryParams);
    options.filter = parsed.filter;

    if (sort) {
      const fields = sort.split(":");
      const sorter = fields[0];
      const direction = fields[1];
      options.sort = { [sorter]: direction === ascending ? 1 : -1 };
    }

    if (limit) {
      options.limit = parseInt(limit);
    } else {
      options.limit = maxLimit;
    }

    if (page) {
      options.page = parseInt(page);
    }

    if (offset) {
      options.offset = parseInt(offset);
    }

    return options;
  }
};
