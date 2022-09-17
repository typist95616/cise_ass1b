const express = require('express');
const app = express();

const path = require('path');
const connectDB = require('./db.js');


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