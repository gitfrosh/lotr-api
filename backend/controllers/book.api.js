const Book = require('./../models/book.model');
const Chapter = require('./../models/chapter.model');
const mongoose = require('mongoose');
const config = require('./../helpers/config');

module.exports = {
  getBooks: async (req, res, next) => {
    const options = await config.getOptions(req);
    try {
      const books = await Book.paginate(options.filter, options);
      return res.json(books);
    } catch (err) {
      return next(err);
    }
  },
  getBook: async (req, res, next) => {
    const options = await config.getOptions(req);

    try {
      const id = req.params.id;
      const book = await Book.paginate({ _id: id }, options);
      return res.json(book);
    } catch (err) {
      return next(err);
    }
  },
  getChaptersByBook: async (req, res, next) => {
    const options = await config.getOptions(req);

    try {
      const id = req.params.id;
      const book = await Chapter.paginate({ book: mongoose.Types.ObjectId(id) }, {
        select: { chapterName: 1, bookName: 1 },
        ...options
      });
      return res.json(book);
    } catch (err) {
      return next(err);
    }
  },
};
