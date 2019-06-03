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
    // id: {
    //   type: Types.Number,
    //   required: true,
    //   // unique: true
    // },
    dialog: {
      type: Types.String,
      required: true
    },
    movie: {
      type: Types.ObjectId,
      ref: "movie",
      required: true
    },
    character: {
      type: Types.ObjectId,
      ref: "character",
      required: false
    }
  });

  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      readAuth: true,
      allowCreate: false,
      allowUpdate: false,
      allowDelete: false,
      associations: {
        movie: {
          type: "MANY_ONE",
          model: "movie",
          allowAdd: false,
          allowRemove: false,
        },
        character: {
          type: "MANY_ONE",
          model: "character",
          allowAdd: false,
          allowRemove: false,
        }
      },
    }
  };

  return Schema;
};
