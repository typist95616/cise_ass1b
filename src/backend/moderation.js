require("dotenv").config({ path: "./config.env" });
const path = require('path');
const express = require("express");

const app = express();
const client = require('./config/dbClient');
const { ObjectId } = require("mongodb");
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
            const processResult = await processPaper.find({title: row.title});
            const rejectedResult = await rejectPaper.findOne({title:row.title});        
            if(activeResult != null){
                row.activeExisted = true;
            }else{
                row.activeExisted = false;
            }
            if(rejectedResult != null){
                row.rejectExisted = true;
            }else{
                row.rejectExisted = false;
            }
            console.log(processResult);
            if(processResult.length > 1){
                row.processExisted = true;
            }else{
                row.processExisted = false;
            }


        }
        res.send(JSON.stringify(result));
        res.end();
    })
    router.post('/approveArticle', (req, res)=>{
        const filter = {_id:new ObjectId(req.body._id)};
        const update = {status: "Waiting Analyse"};
        processPaper.updateOne(filter, {$set:update})
        .then(result=>{
            console.log("Update success");
            sendEmail(req.body, "Approved");
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
    router.post('/rejectArticle', (req, res)=>{

        processPaper.findOneAndDelete({_id:new ObjectId(req.body._id)})
        .then(result=>{
            rejectPaper.insertOne(result.value)
            .then(result=>{
                sendEmail(req.body, "Rejected");
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

function sendEmail(row, result){
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'waltersiu95616@gmail.com',
          pass: 'obphtfmkydvjcdmm'
        }
      });
      
      var mailOptions = {
        from: 'waltersiu95616@gmail.com',
        to: row.email,
        subject: row.title + ' submission result',
        text:
        'Title: ' + row.title + '\n' +
        'SE Practic: ' + row.SEpractice + '\n' +
        'Claims: ' + row.claims + '\n' +
        'Result: '+ result + '\n' + 
        'Thank you for your submission'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = router;

