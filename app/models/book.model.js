module.exports = function(mongoose) {
  let modelName = "book";
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
      createAuth: true,
      updateAuth: true,
      deleteAuth: true
    }
  };

  return Schema;
};
