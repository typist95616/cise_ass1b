const express = require('express');
const app = express();

const path = require('path');
const connectDB = require('./config/db.js');


app.use(express.json());

connectDB();

const port = process.env.PORT || 5051;
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '/build')));
    app.get("/APITesting", (req,res)=>{
        res.send("API running")
    })
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    })
}else{
    app.get("/test", (req,res)=>{
        res.send("API running")
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
