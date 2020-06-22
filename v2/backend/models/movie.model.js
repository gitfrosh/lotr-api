const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        // unique: true
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

const Movie = mongoose.model("movies", movieSchema);

module.exports = Movie;