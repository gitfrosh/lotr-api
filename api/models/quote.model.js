// const QuoteSchema = new Schema({
//   id: Number,
//   char: String,
//   dialog: String,
//   movie: ObjectId
// });

module.exports = function(mongoose) {
  let modelName = "quote";
  let Types = mongoose.Schema.Types;
  let Schema = new mongoose.Schema({
    id: {
      type: Types.Number,
      required: true,
      unique: true
    },
    char: {
      type: Types.String,
      required: false
    },
    dialog: {
      type: Types.String,
      required: true
    },
    movie: {
        type: Types.ObjectId,
        ref: "movie",
        required: true
      }
  });

  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
        movie: {
          type: "MANY_ONE",
          model: "movie"
        }
      }
    }
  };

  return Schema;
};
