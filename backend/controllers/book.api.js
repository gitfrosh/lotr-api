const Book = require("./../models/book.model");
const Chapter = require("./../models/chapter.model");
const mongoose = require("mongoose");
const config = require("./../helpers/config");

module.exports = {
  getBooks: async function (req, res) {
    const options = await config.getOptions(req);
    await Book.paginate(options.filter, options, async function (err, books) {
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
    const options = await config.getOptions(req);

    const id = req.params.id;
    await Book.paginate({ _id: id }, options, async function (err, book) {
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
    const options = await config.getOptions(req);

    const id = req.params.id;
    await Chapter.paginate({book: mongoose.Types.ObjectId(id)}, {
      select: {chapterName: 1, bookName: 1},
      ...options
    }, async function (err, book) {
      if (err) {
        return res.json({
          success: false,
        });
      }
      return res.json(book);
    });
  },
};
