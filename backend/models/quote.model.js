const mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');

const quoteSchema = new mongoose.Schema(
  {
    dialog: {
        type: String,
        required: true
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
  },
  { timestamps: true }
);

quoteSchema.plugin(mongoosePaginate);

const Quote = mongoose.model("quotes", quoteSchema);

module.exports = Quote;