const mongoose = require("mongoose");

const database_url = process.env.DATABASE_URL;

const connectDb = () => {
  return mongoose.connect(database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

exports.connectDb = connectDb;