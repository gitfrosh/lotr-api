const Book = require("./../models/book.model");
const Chapter = require("./../models/chapter.model");
const mongoose = require("mongoose");

module.exports = {
  getTest: function (req, res) {
    return res.json({
      success: true,
    });
  },
  getBooks: async function (req, res) {
    await Book.find({}, async function (err, books) {
      if (err) {
        return res.json({
          success: false,
        });
      }
      return res.json(books);
    });
  },
  getBook: async function (req, res) {
    const id = req.params.id;
    await Book.find({_id: id}, async function (err, book) {
      if (err) {
        return res.json({
          success: false,
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
  getChapters: async (req, res, next) => {
    try {
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
    } catch (e) {
      console.log(e);
      return res.sendStatus(500).send({
        success: false,
        message: "Something went wrong.",
      });
    }
  },
  //   getChapters: async function (req, res) {
  //     console.log(req, res);
  //     await Chapter.find({}, "chapterName bookName", async function (
  //       err,
  //       chapter
  //     ) {
  //       if (err) {
  //         return res.json({
  //           success: false,
  //         });
  //       }
  //       return res.json(chapter);
  //     });
  //   },
};
// await Book.find({}.populate('chapters', async function (err, book) {
//     if (err) {
//       return res.json({
//         success: false,
//       });
//     }
//     return res.json(book);
//   }));
// },
