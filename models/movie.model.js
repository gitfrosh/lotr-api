module.exports = function(mongoose) {
  let modelName = "movie";
  let Types = mongoose.Schema.Types;
  let Schema = new mongoose.Schema(
    {
      name: {
        type: Types.String,
        required: true,
        // unique: true
      },
      runtimeInMinutes: {
        type: Types.Number,
        required: true
      },
      budgetInMillions: {
        type: Types.Number,
        required: true
      },
      boxOfficeRevenueInMillions: {
        type: Types.Number,
        required: true
      },
      academyAwardNominations: {
        type: Types.Number,
        required: true
      },
      academyAwardWins: {
        type: Types.Number,
        required: true
      },
      rottenTomatoesScore: {
        type: Types.Number,
        required: true
      }
    }
  );

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
          foreignField: "movie",
          model: "quote",
          allowAdd: false,
          allowRemove: false,
        }
      },
    }
  };

  return Schema;
};
