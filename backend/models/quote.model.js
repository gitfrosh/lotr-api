const mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');

function removeBlanks(value) {
  return value?.replace(/\s\s+/g, ' ')?.trim();
};

const quoteSchema = new mongoose.Schema(
  {
    dialog: {
      type: String,
      required: true,
      trim: true,
      get: removeBlanks
    },
    movie: {
      type: mongoose.Types.ObjectId,
      ref: "movie",
      required: true
    },
    character: {
      type: mongoose.Types.ObjectId,
      ref: "character",
      required: false
    }
  },
  {
    collection: "quotes",
    toJSON: { getters: true },
    toObject: { getters: true },
  },
  { timestamps: true }
);

quoteSchema.plugin(mongoosePaginate);

const Quote = mongoose.model("quotes", quoteSchema);

module.exports = Quote;