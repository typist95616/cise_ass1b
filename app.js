const express = require('express');
const app = express();

const path = require('path');

const port = process.env.PORT || 5051;
app.use(express.static(path.join(__dirname, '/client/build')));
if(process.env.NODE_ENV === "production"){
    app.get('/', (req, res) => {
        req.sendFile(path.resolve(_dirname, 'build', 'index.html'));
    })
}
app.get("/test", (req,res)=>{
    res.send("Hello");
})

app.listen(port, (err) => {
    if(err) return console.log(err);
    console.log('Server running on port: ', port);
})