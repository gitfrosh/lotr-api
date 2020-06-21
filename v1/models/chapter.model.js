module.exports = function(mongoose) {
  let modelName = "chapter";
  let Types = mongoose.Schema.Types;
  let Schema = new mongoose.Schema({
    name: {
      type: Types.String,
      required: true
      // unique: true
    },
    book: {
      type: Types.ObjectId,
      ref: "book",
      required: true
    },
    // ChapterData: {
    //   type: Types.String,
    //   required: true
    //   // unique: true
    // }
  });

  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      readAuth: true,
      allowCreate: false,
      allowUpdate: false,
      allowDelete: false,
      associations: {
        book: {
          type: "MANY_ONE",
          model: "book",
          allowAdd: false,
          allowRemove: false,
        },
      }
    }
  };

  return Schema;
};
