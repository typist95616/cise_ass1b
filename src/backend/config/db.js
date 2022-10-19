const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require("path");
dotenv.config({path: path.join(__dirname , '../../../config.env')});

const url = "mongodb+srv://typist95616:Fung54321546@ciseass1b.dcb4ip8.mongodb.net/SPEED?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    console.log(url);
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
