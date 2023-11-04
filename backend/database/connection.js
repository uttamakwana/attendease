const mongoose = require("mongoose");

const DB = "mongodb://127.0.0.1:27017/Vibrant-2023";
// "mongodb+srv://rajvora1234567890:Raj$2912@cluster0.ajjfsaq.mongodb.net/";

const connectDB = () => {
  mongoose
    .connect(DB)
    .then((data) => {
      console.log("Connected to database...");
      console.log(data.connection.host);
      console.log(data.connection.name);
    })
    .catch((e) => {
      console.log(e);
      console.log("Err!!Not connected");
    });
};

module.exports = connectDB;
