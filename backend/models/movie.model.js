const mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    runtimeInMinutes: {
      type: Number,
      required: true
    },
    budgetInMillions: {
      type: Number,
      required: true
    },
    boxOfficeRevenueInMillions: {
      type: Number,
      required: true
    },
    academyAwardNominations: {
      type: Number,
      required: true
    },
    academyAwardWins: {
      type: Number,
      required: true
    },
    rottenTomatoesScore: {
      type: Number,
      required: true
    }
  },
  {
    collection: "movies",
  },
  { timestamps: true }
);

movieSchema.plugin(mongoosePaginate);

const Movie = mongoose.model("movies", movieSchema);

module.exports = Movie;