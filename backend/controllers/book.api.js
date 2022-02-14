const Book = require('./../models/book.model');
const Chapter = require('./../models/chapter.model');
const mongoose = require('mongoose');
const config = require('./../helpers/config');

const { errorResponse } = require('../helpers/constants');

module.exports = {
  getBooks: async (req, res) => {
    const options = await config.getOptions(req);
    try {
      const books = await Book.paginate(options.filter, options);
      return res.json(books);
    } catch (err) {
      return res.json(errorResponse);
    }
  },
  getBook: async (req, res) => {
    const options = await config.getOptions(req);

    try {
      const id = req.params.id;
      const book = await Book.paginate({ _id: id }, options);
      return res.json(book);
    } catch (err) {
      return res.json(errorResponse);
    }
  },
  getChaptersByBook: async (req, res) => {
    const options = await config.getOptions(req);

    try {
      const id = req.params.id;
      const book = await Chapter.paginate({ book: mongoose.Types.ObjectId(id) }, {
        select: { chapterName: 1, bookName: 1 },
        ...options
      });
      return res.json(book);
    } catch (err) {
      return res.json(errorResponse);
    }
  },
};
