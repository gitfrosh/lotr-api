const mongoose = require("mongoose");

const database_url =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/lotr";

const connectDb = () => {
  return mongoose.connect(database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

exports.connectDb = connectDb;