const express = require('express');
const app = express();
const path = require("path");
const client = require('./config/dbClient');

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
    app.get("APITesting", (req,res)=>{
        res.send("API running");
        console.log("test");
        res.end();
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