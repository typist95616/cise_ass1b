const express = require('express');
const app = express();
const path = require("path");
const connectDB = require('./config/db');
const client = require('./config/dbClient');


const database = client.db("SPEED");
const activePaper = database.collection("Active Paper");
const processPaper = database.collection("Process Paper");
const rejectPaper = database.collection("Rejected Paper");

//For testing localhost
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true, //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
//

app.use(express.json());

connectDB();

const port = process.env.PORT || 5051;
console.log(process.env.NODE_ENV);
process.env.NODE_ENV = "production";
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '/build')));
    app.get("/APITesting", (req,res)=>{
        res.send("API running")
    })
    app.get('/moderationList/articlesList', (req, res)=>{
        res.setHeader("Content-Type", "application/json");
        activePaper.find().toArray()
        .then(result=>{
            res.send(JSON.stringify(result));
        })
        .catch(error=>{
            console.log(error);
            res.end();
        })
    })
    app.post('/moderationList/insertArticle', (req, res)=>{
        const doc = req.body;
        activePaper.insertOne(doc)
        .then((result)=>{
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        })
        res.end();
    })
    app.get('/moderationList/checkExist/:title', (req,res)=>{
        const title = req.params.title;
        rejectPaper.findOne({
            title: title
        })
        .then((output)=>{
            if(output != null){
                res.send(true);
            }else{
                res.send(false);
            }
            res.end();
        })
        .catch((error)=>{
            console.log(error);
            res.end();
        })
    })
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
        })
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

app.get("getBook", (req, res) => {
    const { MongoClient } = require("mongodb");
    MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://typist95616:Fung54321546@ciseass1b.dcb4ip8.mongodb.net/?retryWrites=true&w=majority";
    MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var dbo = db.db("SPEED");

        dbo.collection("User").find({}).toArray(function(err, result){
        if(err) throw err;
        res.json({result});
        });
    });
})
