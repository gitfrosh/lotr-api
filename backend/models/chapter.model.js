const mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');

const chapterSchema = new mongoose.Schema(
  {
    chapterName: {
      type: String,
      required: true,
      unique: true
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "book",
      required: true
    },
    bookName: {
      type: String,
      required: true,
    },
    ChapterData: {
      type: String,
      required: true,
    },
  },
  {
    collection: "chapters",
  },
  { timestamps: true }
);

chapterSchema.plugin(mongoosePaginate);

const Chapter = mongoose.model("chapters", chapterSchema);

module.exports = Chapter;