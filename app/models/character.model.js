module.exports = function(mongoose) {
  let modelName = "character";
  let Types = mongoose.Schema.Types;
  let Schema = new mongoose.Schema({
    Name: {
      type: Types.String,
      required: true,
      unique: false
    },
    Url: {
      type: Types.String,
      required: true
    },
    Race: {
      type: Types.String,
      required: true
    },
    birth: {
      type: Types.String,
      required: false
    },
    gender:  {
      type: Types.String,
      required: false
    },
    death: {
      type: Types.String,
      required: false
    },
    hair: {
      type: Types.String,
      required: false
    },
    height: {
      type: Types.String,
      required: false
    },
    realm: {
      type: Types.String,
      required: false
    },
    spouse: {
      type: Types.String,
      required: false
    }
  });

  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
        quotes: {
          type: "ONE_MANY",
          alias: "quote",
          foreignField: "character",
          model: "quote"
        }
      },
    }
  };

  return Schema;
};
