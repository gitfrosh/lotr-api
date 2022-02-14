const mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
  },
  {
    collection: "books",
  },
  { timestamps: true }
);

bookSchema.plugin(mongoosePaginate);

const Book = mongoose.model("books", bookSchema);

module.exports = Book;