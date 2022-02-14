const Chapter = require("./../models/chapter.model");
const config = require("./../helpers/config");

module.exports = {
  getChapters: async (req, res) => {
    const options = await config.getOptions(req);

    await Chapter.paginate(options.filter, {
      ...options,
      select: {
        chapterName: 1,
        book: 1
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
        book: 1
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
  }
}