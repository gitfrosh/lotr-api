module.exports = function(mongoose) {
  let modelName = "character";
  let Types = mongoose.Schema.Types;
  let Schema = new mongoose.Schema({
    name: {
      type: Types.String,
      required: true,
      unique: false
    },
    wikiUrl: {
      type: Types.String,
      required: true
    },
    race: {
      type: Types.String,
      required: true
    },
    birth: {
      type: Types.String || Types.Number || null,
      required: false
    },
    gender:  {
      type: Types.String,
      required: false
    },
    death: {
      type: Types.String || Types.Number,
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
      readAuth: true,
      allowCreate: false,
      allowUpdate: false,
      allowDelete: false,
      associations: {
        quotes: {
          type: "ONE_MANY",
          alias: "quote",
          foreignField: "character",
          model: "quote",
          allowAdd: false,
          allowRemove: false,
        }
      },
    }
  };

  return Schema;
};
