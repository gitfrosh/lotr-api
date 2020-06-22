const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    wikiUrl: {
      type: String,
      required: true,
    },
    race: {
      type: String,
      required: true,
    },
    birth: {
      type: String || Number || null,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    death: {
      type: String || Number,
      required: false,
    },
    hair: {
      type: String,
      required: false,
    },
    height: {
      type: String,
      required: false,
    },
    realm: {
      type: String,
      required: false,
    },
    spouse: {
      type: String,
      required: false,
    },
  },
  {
    collection: "characters",
  },
  { timestamps: true }
);

const Character = mongoose.model("characters", characterSchema);

module.exports = Character;
