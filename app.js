const express = require('express');


const path = require("path")
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Post = require('./models/post')
const authMiddleware = require("./middleware/check.auth");
const app = express();
const cors = require('cors');
app.use("/images",express.static(path.join("backend/images")));
const postRoute = require("./routes/post");

const userRoute = require("./routes/user")

app.use(cors());

mongoose.set('strict', false);
mongoose.connect("mongodb://127.0.0.1:27017/marketPlace", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.error('Failed to connect:', err);
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader("Access-Control-Allow-Method","GET,POST,PATCH,DELETE,OPTIONS,PUT")
    next();
})


// OPTIONS route handler
app.options('/api/posts/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
    res.sendStatus(200);
  });

app.use("/api/posts",postRoute);
app.use("/api/user", userRoute)
app.use(authMiddleware);
module.exports = app;