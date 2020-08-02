const Chapter = require("./../models/chapter.model");
const mongoose = require("mongoose");
const config = require("./../helpers/config");

module.exports = {
    getChaptersByBook: async function (req, res) {
    const options = await config.getOptions(req);
    const id = req.params.id;
    await Chapter.paginate(
      { book: mongoose.Types.ObjectId(id) },
      {
        ...options, 
        select: {
          chapterName: 1
        }
      },
      async function (err, book) {
        if (err) {
          return res.json({
            success: false,
            message: "Something went wrong.",
          });
        }
        return res.json(book);
      }
    );
  },
  getChapters: async (req, res) => {
    const options = await config.getOptions(req);

    await Chapter.paginate({}, {
      ...options,
      select: {
        chapterName: 1,
        bookName: 1
      }
    }, async function (
      err,
      chapter
    ) {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Something went wrong.",
        });
      }
      return res.json(chapter);
    });
  },
  getChapter: async (req, res) => {
    const options = await config.getOptions(req);
    const id = req.params.id;
    await Chapter.paginate({ _id: id }, {
      ...options,
      select: {
        chapterName: 1,
        bookName: 1
      }
    }, async function (
      err,
      chapter
    ) {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Something went wrong.",
        });
      }
      return res.json(chapter);
    });
  }}