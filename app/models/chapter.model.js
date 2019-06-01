module.exports = function(mongoose) {
  let modelName = "chapter";
  let Types = mongoose.Schema.Types;
  let Schema = new mongoose.Schema({
    BookName: {
      type: Types.String,
      required: true
      // unique: true
    },
    ChapterName: {
      type: Types.String,
      required: true
      // unique: true
    },
    ChapterData: {
      type: Types.String,
      required: true
      // unique: true
    }
  });

  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      readAuth: true,
      allowCreate: false,
      allowUpdate: false,
      allowDelete: false,

    }
  };

  return Schema;
};
