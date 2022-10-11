const dotenv = require('dotenv');
const path = require("path");
const { MongoClient } = require('mongodb');
dotenv.config({path: path.join(__dirname , '../../../config.env')});

const url = process.env.DatabaseURL;

const dbClient = new MongoClient(url);

module.exports = dbClient;