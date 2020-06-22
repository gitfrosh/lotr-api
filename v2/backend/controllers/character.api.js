const Character = require("./../models/character.model");
const Quote = require("./../models/quote.model");

const mongoose = require("mongoose");

module.exports = {
  getCharacters: async (req, res, next) => {
    await Character.find({}, async function (err, character) {
      if (err) {
        return res.sendStatus(500).send({
          success: false,
          message: "Something went wrong.",
        });
      }
      return res.json(character);
    });
  },
  getCharacter: async (req, res, next) => {
    const id = req.params.id;
    await Character.find({ _id: id }, async function (err, character) {
      if (err) {
        return res.sendStatus(500).send({
          success: false,
          message: "Something went wrong.",
        });
      }
      return res.json(character);
    });
  },
  getQuoteByCharacter: async (req, res, next) => {
    const id = req.params.id;
    await Quote.find(
      { character: mongoose.Types.ObjectId(id) }, "dialog movie character",
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
