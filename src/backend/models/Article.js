const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    id : Number,
    title : String,
    authors : [String],
    journal : String,
    yearOfPublication : Number, 
    volume : Number,
    pages : Number,
    DOI : Number,
    claims : String,
    SEpractice : String
});

const Article = mongoose.model('Article', ArticleSchema, 'Test Active Paper');
module.exports = Article;