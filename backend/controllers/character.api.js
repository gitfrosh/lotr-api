const Character = require("./../models/character.model");
const Quote = require("./../models/quote.model");
const config = require("./../helpers/config");

const mongoose = require("mongoose");

module.exports = {
  getCharacters: async (req, res, next) => {
    const options = await config.getOptions(req);
    await Character.paginate({}, options, async function (err, characters) {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Something went wrong.",
        });
      }
      return res.json(characters);
    });
  },
  getCharacter: async (req, res, next) => {
    const options = await config.getOptions(req);
    const id = req.params.id;
    await Character.paginate({ _id: id }, options, async function (
      err,
      character
    ) {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Something went wrong.",
        });
      }
      return res.json(character);
    });
  },
  getQuoteByCharacter: async (req, res, next) => {
    const options = await config.getOptions(req);
    const id = req.params.id;
    await Quote.paginate(
      { character: mongoose.Types.ObjectId(id) },
      { 
        ...options, 
        select: { dialog: 1, movie: 1, character: 1 } 
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
  findCharactersByName: async (req, res, next) => {
    const options = await config.getOptions(req);
    // let char_name = new RegExp('/' + req.query.name.trim + '/i');
    await Character.paginate(
      { 
        name: new RegExp(req.query.name ,'i')
      },
      options,
      async function (err, found_characters) {
        if (err) {
          console.log('error --- ' +  err)
          return res.status(500).send({
            success: false,
            message: "Something went wrong. " + err,
          });
        }
        return res.json(found_characters);
      }
    );
  },
};
