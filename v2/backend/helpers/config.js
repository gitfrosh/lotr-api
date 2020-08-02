module.exports = {
  getOptions: async function (req) {
    let options = {};

    const sort = req.query.sort;
    let limit = req.query.limit;
    let page = req.query.page;
    let offset = req.query.offset;

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
