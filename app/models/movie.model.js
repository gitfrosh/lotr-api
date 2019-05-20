module.exports = function(mongoose) {
  let modelName = "movie";
  let Types = mongoose.Schema.Types;
  let Schema = new mongoose.Schema(
    {
      Name: {
        type: Types.String,
        required: true,
        // unique: true
      },
      RuntimeInMinutes: {
        type: Types.Number,
        required: true
      },
      BudgetInMillions: {
        type: Types.Number,
        required: true
      },
      BoxOfficeRevenueInMillions: {
        type: Types.Number,
        required: true
      },
      AcademyAwardNominations: {
        type: Types.Number,
        required: true
      },
      AcademyAwardWins: {
        type: Types.Number,
        required: true
      },
      RottenTomatoesScore: {
        type: Types.Number,
        required: true
      }
    }
  );

  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
        quotes: {
          type: "ONE_MANY",
          alias: "quote",
          foreignField: "movie",
          model: "quote"
        }
      },
      readAuth: true,
      createAuth: true,
      updateAuth: true,
      deleteAuth: true
    }
  };

  return Schema;
};
