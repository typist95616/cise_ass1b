const dotenv = require('dotenv');
const path = require("path");
const { MongoClient } = require('mongodb');
dotenv.config({path: path.join(__dirname , '../../../config.env')});

const url = "mongodb+srv://jackie:JackieLai@ciseass1b.dcb4ip8.mongodb.net/?retryWrites=true&w=majority";

const dbClient = new MongoClient(url);

module.exports = dbClient;