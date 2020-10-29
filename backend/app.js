const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");

const postsRoutes = require("./routes/posts")

const app = express();
// big chain of middleware/funnel

//pw kT28HDmiZKcmPrwp
mongoose.connect("mongodb://edwin:edwin@cluster0-shard-00-00.0bvjz.mongodb.net:27017,cluster0-shard-00-01.0bvjz.mongodb.net:27017,cluster0-shard-00-02.0bvjz.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-il0d9v-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to DB!");
  }).catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //for URL encoded data
app.use("/images", express.static(path.join("backend/images")));
//request going to images, will be forwards to backend/images

app.use((req, res, next) => { //add headers to bypass CORS error
  res.setHeader("Access-Control-Allow-Origin", "*"); //no matter what domain it comes from, access granted
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"); //allow other headers
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, PUT, OPTIONS"); //allow other HTTP methods
  next(); //so it moves on to next middleware
});

app.use("/api/posts", postsRoutes);


module.exports = app;
//export the entire app module, incl the methods

