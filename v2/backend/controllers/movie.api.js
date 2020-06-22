const Movie = require("./../models/movie.model");
const Quote = require("./../models/quote.model");
const Character = require("./../models/character.model");

const mongoose = require("mongoose");

module.exports = {
  getMovie: async (req, res, next) => {
    const id = req.params.id;
    await Movie.find({ _id: id }, async function (err, movie) {
      if (err) {
        return res.sendStatus(500).send({
          success: false,
          message: "Something went wrong.",
        });
      }
      return res.json(movie);
    });
  },
  getMovies: async (req, res, next) => {
    await Movie.find({}, async function (err, movies) {
      if (err) {
        return res.sendStatus(500).send({
          success: false,
          message: "Something went wrong.",
        });
      }
      return res.json(movies);
    });
  },
  getQuoteByMovie: async (req, res, next) => {
    const id = req.params.id;
    await Quote.find(
      { movie: mongoose.Types.ObjectId(id) },
      "dialog movie character",
      async function (err, quotes) {
        if (err) {
          return res.sendStatus(500).send({
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
          return res.sendStatus(500).send({
            success: false,
            message: "Something went wrong.",
          });
        }
        return res.json(quotes);
      }
    );
  },
};
