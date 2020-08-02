const Quote = require("./../models/quote.model");
const config = require("./../helpers/config");

module.exports = {
  getQuotes: async (req, res) => {
    const options = await config.getOptions(req);
    await Quote.paginate(
      {},
      {
        ...options,
        select: {
          dialog: 1,
          movie: 1,
          character: 1,
        },
      },
      async function (err, quote) {
        if (err) {
          return res.sendStatus(500).send({
            success: false,
            message: "Something went wrong.",
          });
        }
        return res.json(quote);
      }
    );
  },
  getQuote: async (req, res, next) => {
    const options = await config.getOptions(req);
    const id = req.params.id;
    await Quote.paginate(
      { _id: id },
      {
        ...options,
        select: {
          dialog: 1,
          movie: 1,
          character: 1,
        },
      },
      async function (err, quote) {
        if (err) {
          return res.sendStatus(500).send({
            success: false,
            message: "Something went wrong.",
          });
        }
        return res.json(quote);
      }
    );
  },
};
