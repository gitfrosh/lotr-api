const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      exclude: true,
      allowOnUpdate: false,
    },
    access_token: {
      type: String,
      required: true,
    },
  },
  {
    collection: "user",
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;