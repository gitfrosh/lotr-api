const Quote = require("./../models/quote.model");
const mongoose = require("mongoose");

module.exports = {
//     getChaptersByBook: async function (req, res) {
//     const id = req.params.id;
//     await Chapter.find(
//       { book: mongoose.Types.ObjectId(id) },
//       "chapterName",
//       async function (err, book) {
//         if (err) {
//           return res.json({
//             success: false,
//             message: "Something went wrong.",
//           });
//         }
//         return res.json(book);
//       }
//     );
//   },
  getQuotes: async (req, res, next) => {
    await Quote.find({}, "dialog movie character", async function (
      err,
      quote
    ) {
      if (err) {
        return res.sendStatus(500).send({
          success: false,
          message: "Something went wrong.",
        });
      }
      return res.json(quote);
    });
  },
  getQuote: async (req, res, next) => {
    const id = req.params.id;
    await Quote.find({ _id: id }, "dialog movie character", async function (
      err,
      quote
    ) {
      if (err) {
        return res.sendStatus(500).send({
          success: false,
          message: "Something went wrong.",
        });
      }
      return res.json(quote);
    });
  }}