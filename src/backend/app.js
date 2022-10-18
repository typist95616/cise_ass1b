const express = require('express');
const app = express();
const path = require("path");
const connectDB = require('./config/db');
const client = require('./config/dbClient');
const articleRoutes = require('./routes/Article');
const Article = require('../models/ActiveArticleModel');

//For testing localhost
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true, //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());

connectDB();

const port = process.env.PORT || 5051;
console.log(process.env.NODE_ENV);

app.use('/api', articleRoutes);

app.put('/api/update', async (req, res) => {
    const newRating = req.body.newRating;
    const _id = req.body._id;

    try {
        await Article.findById(_id, (error, articleToUpdate) => {
            articleToUpdate.rating = Number(newRating);
            articleToUpdate.save();
            res.send(articleToUpdate);
        }).clone();
    } catch (err) {
        console.log(err);
    }
})

if(process.env.NODE_ENV === "production"){
    //Connect moderation
    app.use(express.static(path.join(__dirname, '/build')));
    const moderation = require('./moderation.js');
    app.use(express.json({ extended: false }));
    app.use('/moderationList', moderation);
//

const port = process.env.PORT || 5051;
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === "production"){
    //Connect moderation
    app.use(express.static(path.join(__dirname, '/build')));
    const rejectArticles = require('./rejectArticles.js');
    const moderation = require('./moderation.js');
    const waitingArticlesList = require('./waitArticlesList.js')
    const articlesList = require('./articlesList.js');
    app.use(express.json({ extended: false }));
    app.use('/rejectArticlesList', rejectArticles);
    app.use('/moderationList', moderation);
    app.use('/waitingArticlesList', waitingArticlesList);
    app.use('/activeArticlesList', articlesList);
}else{
    app.get("/test", (req,res)=>{
        res.send("API running");
        res.end();
    })
}

app.listen(port, (err) => {
    if(err) return console.log(err);
    console.log('Server running on port: ', port);
})

app.get("/", (req, res) => {
    res.send("Hello")
})