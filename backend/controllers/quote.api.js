const Quote = require("./../models/quote.model");
const config = require("./../helpers/config");

const { errorResponse, HttpCode } = require('../helpers/constants');

module.exports = {
  getQuotes: async (req, res) => {
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
      return res.status(HttpCode.SERVER_ERROR).send(errorResponse);
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
      return res.status(HttpCode.SERVER_ERROR).send(errorResponse);
    }
  }
};
