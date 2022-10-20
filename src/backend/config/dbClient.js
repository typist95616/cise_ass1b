const dotenv = require('dotenv');
const path = require("path");
const { MongoClient } = require('mongodb');
dotenv.config({path: path.join(__dirname , '../../../config.env')});

const url = "mongodb+srv://typist95616:Fung54321546@ciseass1b.dcb4ip8.mongodb.net/?retryWrites=true&w=majority";

const dbClient = new MongoClient(url);

module.exports = dbClient;