const Chapter = require("./../models/chapter.model");
const mongoose = require("mongoose");

module.exports = {
    getChaptersByBook: async function (req, res) {
    const id = req.params.id;
    await Chapter.find(
      { book: mongoose.Types.ObjectId(id) },
      "chapterName",
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
  getChapters: async (req, res, next) => {
    await Chapter.find({}, "chapterName bookName", async function (
      err,
      chapter
    ) {
      if (err) {
        return res.sendStatus(500).send({
          success: false,
          message: "Something went wrong.",
        });
      }
      return res.json(chapter);
    });
  },
  getChapter: async (req, res, next) => {
    const id = req.params.id;
    await Chapter.find({ _id: id }, "chapterName bookName", async function (
      err,
      chapter
    ) {
      if (err) {
        return res.sendStatus(500).send({
          success: false,
          message: "Something went wrong.",
        });
      }
      return res.json(chapter);
    });
  }}