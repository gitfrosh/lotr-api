const Chapter = require("./../models/chapter.model");
const config = require("./../helpers/config");

const { errorResponse, HttpCode } = require('../helpers/constants');

module.exports = {
  getChapters: async (req, res) => {
    const options = await config.getOptions(req);

    try {
      const chapter = await Chapter.paginate(options.filter, {
        ...options,
        select: {
          chapterName: 1,
          book: 1
        }
      });
      return res.json(chapter);
    } catch (err) {
      return res.status(HttpCode.SERVER_ERROR).send(errorResponse);
    }
  },
  getChapter: async (req, res) => {
    const options = await config.getOptions(req);
    try {
      const id = req.params.id;
      const chapter = await Chapter.paginate({ _id: id }, {
        ...options,
        select: {
          chapterName: 1,
          book: 1
        }
      });
      return res.json(chapter);
    } catch (err) {
      return res.status(HttpCode.SERVER_ERROR).send(errorResponse);
    }
  }
}