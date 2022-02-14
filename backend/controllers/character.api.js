const Character = require("./../models/character.model");
const Quote = require("./../models/quote.model");
const config = require("./../helpers/config");

const mongoose = require("mongoose");

const { errorResponse, HttpCode } = require('../helpers/constants');

module.exports = {
  getCharacters: async (req, res, next) => {
    try {
      const options = await config.getOptions(req);
      const characters = await Character.paginate(options.filter, options);
      return res.json(characters);
    } catch (err) {
      return res.status(HttpCode.SERVER_ERROR).send(errorResponse);
    }
  },
  getCharacter: async (req, res, next) => {
    try {
      const options = await config.getOptions(req);
      const id = req.params.id;
      const character = await Character.paginate({ _id: id }, options);
      return res.json(character);
    } catch (err) {
      return res.status(HttpCode.SERVER_ERROR).send(errorResponse);
    }
  },
  getQuoteByCharacter: async (req, res, next) => {
    try {
      const options = await config.getOptions(req);
      const id = req.params.id;
      const quotes = await Quote.paginate(
        { character: mongoose.Types.ObjectId(id) },
        {
          ...options,
          select: { dialog: 1, movie: 1, character: 1 }
        });
      return res.json(quotes);
    } catch (err) {
      return res.status(HttpCode.SERVER_ERROR).send(errorResponse);
    }
  }
};
