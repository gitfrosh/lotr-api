module.exports = function(mongoose) {
  let modelName = "book";
  let Types = mongoose.Schema.Types;
  let Schema = new mongoose.Schema({
    name: {
      type: Types.String,
      required: true
      // unique: true
    }
  });

  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      readAuth: false, //disable authentication
      allowCreate: false,
      allowUpdate: false,
      allowDelete: false,
      associations: {
        chapters: {
          type: "ONE_MANY",
          alias: "chapter",
          foreignField: "book",
          model: "chapter",
          allowAdd: false,
          allowRemove: false
        }
      }
    }
  };

  return Schema;
};
