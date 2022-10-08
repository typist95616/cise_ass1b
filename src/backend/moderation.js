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
        res.setHeader("Content-Type", "application/json");
        let result = await processPaper.find({status: "Waiting Moderation"}).toArray();
        for(let row of result){
            const activeResult = await activePaper.findOne({title:row.title});
            const rejectedResult = await rejectPaper.findOne({title:row.title});        
            if(activeResult != null || rejectedResult != null){
                row.existed = true;
            }else{
                row.existed = false;
            }
        }
        res.send(JSON.stringify(result));
        res.end();
    })
    router.post('/approveArticle', (req, res)=>{
        const filter = {id:req.body.id};
        const update = {status: "Waiting Analyse"};
        processPaper.updateOne(filter, {$set:update})
        .then(result=>{
            console.log("Update success");
        
        })
        .catch(err=>{
            console.log(err);
        })
        res.end();
    })
    router.get('/checkExist/:title', (req,res)=>{
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
    router.post('/rejectPaper', (res, req)=>{
        processPaper.findOneAndDelete({id:res.body.id})
        .then(result=>{
            console.log("article found");
            console.log(result.value);
            rejectPaper.insertOne(result.value)
            .then(result=>{
                console.log("move to reject paper");
                console.log(result);
            })
        })
        .catch(err=>{
            console.log(err);
        })
        res.end();
    })
}else {
    router.get('', (req, res)=>{ 
        res.send("API");
    })
}

module.exports = router;

