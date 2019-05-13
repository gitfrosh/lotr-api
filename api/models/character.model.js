module.exports = function(mongoose) {
  let modelName = "character";
  let Types = mongoose.Schema.Types;
  let Schema = new mongoose.Schema({
    Name: {
      type: Types.String,
      required: true,
      unique: true
    },
    Url: {
      type: Types.String,
      required: true
    },
    Race: {
      type: Types.String,
      required: true
    }
  });

  Schema.statics = {
    collectionName: modelName,
    routeOptions: {}
  };

  return Schema;
};
