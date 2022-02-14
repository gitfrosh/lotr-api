const Movie = require("./../models/movie.model");
const Quote = require("./../models/quote.model");
const config = require("./../helpers/config");

const mongoose = require("mongoose");

const { errorResponse, HttpCode } = require('../helpers/constants');

module.exports = {
  getMovie: async (req, res,) => {
    try {
      const options = await config.getOptions(req);
      const id = req.params.id;
      const movie = await Movie.paginate({ _id: id }, options);
      return res.json(movie);
    } catch (err) {
      return res.status(HttpCode.SERVER_ERROR).send(errorResponse);
    }
  },
  getMovies: async (req, res, next) => {
    try {
      const options = await config.getOptions(req);
      const movies = await Movie.paginate(options.filter, options);
      return res.json(movies);
    } catch (err) {
      return res.status(HttpCode.SERVER_ERROR).send(errorResponse);
    }
  },
  getQuoteByMovie: async (req, res, next) => {
    try {
      const options = await config.getOptions(req);
      const id = req.params.id;
      const quotes = await Quote.paginate(
        { movie: mongoose.Types.ObjectId(id) },
        {
          ...options,
          select: {
            dialog: 1,
            movie: 1,
            character: 1
          }
        }
      );
      return res.json(quotes);
    } catch (err) {
      return res.status(HttpCode.SERVER_ERROR).send(errorResponse);
    }
  }
};
