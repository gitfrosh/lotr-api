const Quote = require("./../models/quote.model");
const config = require("./../helpers/config");

module.exports = {
  getQuotes: async (req, res, next) => {
    try {
      const options = await config.getOptions(req);
      const quote = await Quote.paginate(
        options.filter,
        {
          ...options,
          select: {
            dialog: 1,
            movie: 1,
            character: 1,
          }
        }
      );
      return res.json(quote);
    } catch (err) {
      return next(err);
    }
  },
  getQuote: async (req, res, next) => {
    try {
      const options = await config.getOptions(req);
      const id = req.params.id;
      const quote = await Quote.paginate(
        { _id: id },
        {
          ...options,
          select: {
            dialog: 1,
            movie: 1,
            character: 1,
          }
        });
      return res.json(quote);
    } catch (err) {
      return next(err);
    }
  }
};
