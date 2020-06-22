const Book = require("./../models/book.model");
const mongoose = require("mongoose");

module.exports = {
  getBooks: async function (req, res) {
    await Book.find({}, async function (err, books) {
      if (err) {
        return res.json({
          success: false,
          message: "Something went wrong.",
        });
      }
      return res.json(books);
    });
  },
  getBook: async function (req, res) {
    const id = req.params.id;
    await Book.find({ _id: id }, async function (err, book) {
      if (err) {
        return res.json({
          success: false,
          message: "Something went wrong.",
        });
      }
      return res.json(book);
    });
  },
  getChaptersByBook: async function (req, res) {
    const id = req.params.id;
    await Chapter.find({book: mongoose.Types.ObjectId(id)}, "chapterName", async function (err, book) {
      if (err) {
        return res.json({
          success: false,
        });
      }
      return res.json(book);
    });
  },
};
