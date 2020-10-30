const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const ConnectDB = () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("[DB Connect] : ", err.message);
    process.exit(1);
  }
};

module.exports = ConnectDB;
