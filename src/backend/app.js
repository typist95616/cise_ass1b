require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

const path = require('path');

const port = process.env.PORT || 5051;

if(process.env.NODE_ENV === "production"){
    app.use(express.static('build'));
    app.get('*', (req, res) => {
        req.sendFile(path.resolve(_dirname, 'build', 'index.html'));
    })
}

app.listen(port, (err) => {
    if(err) return console.log(err);
    console.log('Server running on port: ', port);
})

app.get("/", (req, res) => {
    res.send("Hello")
})

// routes
app.use('/api/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })