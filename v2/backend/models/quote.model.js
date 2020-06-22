const mongoose = require("mongoose");

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

const Quote = mongoose.model("quotes", quoteSchema);

module.exports = Quote;