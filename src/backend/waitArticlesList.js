require("dotenv").config({ path: "./config.env" });
const path = require('path');
const express = require("express");

const app = express();
const client = require('./config/dbClient');
const router = express.Router();
const database = client.db("SPEED");
const activePaper = database.collection("Active Paper");
const processPaper = database.collection("Process Paper");
const rejectPaper = database.collection("Rejected Paper");

app.use(express.json());

if(process.env.NODE_ENV === "production"){
    router.use(express.static(path.join(__dirname, '/build')));
    router.get("APITesting", (req,res)=>{
        res.send("API running")
    })
    router.get('/articlesList', async (req, res)=>{
        const result = await processPaper.find().toArray();
        res.send(JSON.stringify(result));
        res.end();
    })
}else {
    router.get('', (req, res)=>{ 
        res.send("API");
    })
}

module.exports = router;

