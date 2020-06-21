const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
      // unique: true
    },
  },
  {
    collection: "books",
  },
  { timestamps: true }
);

const Book = mongoose.model("books", bookSchema);

module.exports = Book;