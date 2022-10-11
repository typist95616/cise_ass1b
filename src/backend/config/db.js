const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require("path");
dotenv.config({path: path.join(__dirname , '../../../config.env')});

const url = process.env.DatabaseURL;

const connectDB = async () => {
  try {
    console.log(process.env.DatabaseURL);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connection Success 👍");
  } catch (error) {
    console.log(error);
    console.log("MongoDB Connection Failed 💥");
    process.exit(1);
  }
};

module.exports = connectDB;