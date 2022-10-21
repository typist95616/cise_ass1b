const express = require('express');
const app = express();
const path = require("path");
const connectDB = require('./config/db');
const client = require('./config/dbClient');
const articleRoutes = require('./routes/Article');
const Article = require('../models/ActiveArticleModel');
const database = client.db("SPEED");
const activePaper = database.collection("Active Paper");
const processPaper = database.collection("Process Paper");
const rejectPaper = database.collection("Rejected Paper");


//For testing localhost
const cors = require('cors');
const e = require('express');
const { request } = require('http');
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
process.env.NODE_ENV = "production";
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '/public')));
    app.get("/APITesting", (req,res)=>{
        res.send("API running")
    })

    // Code for analyse
    app.get('/getArticles', (req, res)=>{
        res.setHeader("Content-Type", "application/json");
        processPaper.find({status: "Waiting Analyse"}).toArray()
        .then(result=>{
            res.send(JSON.stringify(result));
        })
        .catch(error=>{
            console.log(error);
            res.end();
        })
    })

    app.post('/approveAnalyse', (req, res)=>{
        const filter = {id:new ObjectId(req.body._id)};
        const update = {status: "Approved"};
        processPaper.updateOne(filter, {$set:update})
        .then(result=>{
            console.log("updated..");
        })
        .catch(err=>{
            console.log(err);
        })
        res.end();
    })    

    app.post('/rejectAnalyse', (req, res)=>{
        processPaper.findOneAndDelete({id:new ObjectId(req.body._id)})
        .then(result=>{
            console.log("article found");
            console.log(result.value);
            rejectPaper.insertOne(result.value)
            .then(result=>{
                console.log("moved to rejected paper..");
                console.log(result);
            })
        })
        .catch(err=>{
            console.log(err);
        })
        res.end();
    })

    app.post('/submitPaper', (req, res)=>{
        const article = req.body;
        article.status = "Waiting Moderation";
        processPaper.insertOne(article)
        .then(result=>{
            console.log("Inserted..");
        })
        .catch(err=>{
            console.log(err);
        })
        res.end();
    })
}

if(process.env.NODE_ENV === "production"){
    //Connect moderation
    app.use(express.static(path.join(__dirname, '../../build/')));

    const rejectArticles = require('./rejectArticles.js');

    const moderation = require('./moderation.js');

    const waitingArticlesList = require('./waitArticlesList.js')

    const articlesList = require('./articlesList.js');

    app.use(express.json({ extended: false }));

    app.use('/rejectArticlesList', rejectArticles);

    app.use('/moderationList', moderation);

    app.use('/waitingArticlesList', waitingArticlesList);

    app.use('/activeArticlesList', articlesList);

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

    app.get("APITesting", (req,res)=>{

        res.send("API running");

        console.log("test");

        res.end();

    })

    app.get('*', (req, res) => {

        res.sendFile(path.join(__dirname, '../../build', 'index.html'));

    })
    } else{
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
