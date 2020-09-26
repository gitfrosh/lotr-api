var mongooseQueryParser = require('mongoose-query-parser');

module.exports = {
  getOptions: async function (req) {
    let options = { filter: {} };

    const sort = req.query.sort;
    let limit = req.query.limit;
    let page = req.query.page;
    let offset = req.query.offset;

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
      var sorter = fields[0];
      var direction = fields[1];
      options.sort = { [sorter]: direction === "asc" ? 1 : -1 };
    }

    if (limit) {
      options.limit = parseInt(limit);
    } else {
      options.limit = 1000;
    }
    if (page) options.page = parseInt(page);
    if (offset) options.offset = parseInt(offset);

    return options;
  },
};
