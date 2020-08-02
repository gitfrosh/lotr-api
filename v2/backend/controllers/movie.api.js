const Movie = require("./../models/movie.model");
const Quote = require("./../models/quote.model");
const Character = require("./../models/character.model");
const config = require("./../helpers/config");

const mongoose = require("mongoose");

module.exports = {
  getMovie: async (req, res, ) => {
    const options = await config.getOptions(req);
    const id = req.params.id;
    await Movie.paginate({ _id: id }, options, async function (err, movie) {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Something went wrong.",
        });
      }
      return res.json(movie);
    });
  },
  getMovies: async (req, res, next) => {
    const options = await config.getOptions(req);
    await Movie.paginate({}, options, async function (err, movies) {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Something went wrong.",
        });
      }
      return res.json(movies);
    });
  },
  getQuoteByMovie: async (req, res, next) => {
    const options = await config.getOptions(req);
    const id = req.params.id;
    await Quote.paginate(
      { movie: mongoose.Types.ObjectId(id) },
      {
        ...options,
        select: {
          dialog: 1,
          movie: 1,
          character: 1
        }
      },
      async function (err, quotes) {
        if (err) {
          return res.status(500).send({
            success: false,
            message: "Something went wrong.",
          });
        }
        return res.json(quotes);
      }
    );
  },
  getQuoteByCharacter: async (req, res, next) => {
    const id = req.params.id;
    await Character.find(
      { character: mongoose.Types.ObjectId(id) },
      "dialog movie character",
      async function (err, quotes) {
        if (err) {
          return res.status(500).send({
            success: false,
            message: "Something went wrong.",
          });
        }
        return res.json(quotes);
      }
    );
  },
};
