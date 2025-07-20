const mongoose = require("mongoose");
require("dotenv").config();

const DataBase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DataBase is connected");
    })
    .catch((err) => {
      console.log("Something is wrong in the DB", err);
    });
};

module.exports = DataBase
