const mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');

function removeBlanks(value) {
  const temp = value && value.replace(/\s\s+/g, ' ')
  return temp && temp.trim();
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