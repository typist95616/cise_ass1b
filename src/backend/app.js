const express = require('express');
const app = express();

const path = require('path');
const connectDB = require('./config/db');
const moderationList = require('./testData/WaitingModerationTest.json');


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
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '/build')));
    app.get("/APITesting", (req,res)=>{
        res.send("API running")
    })
    app.get('/ModerationList/Test', (req, res)=>{
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(moderationList));
        res.end();
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