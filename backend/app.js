const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('../models/post');

const app = express();
// big chain of middleware/funnel

//pw kT28HDmiZKcmPrwp
mongoose.connect("mongodb://edwin:edwin@cluster0-shard-00-00.0bvjz.mongodb.net:27017,cluster0-shard-00-01.0bvjz.mongodb.net:27017,cluster0-shard-00-02.0bvjz.mongodb.net:27017/node-angular?ssl=true&replicaSet=atlas-il0d9v-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to DB!");
  }).catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//for URL encoded data

app.use((req, res, next) => { //add headers to bypass CORS error
  res.setHeader("Access-Control-Allow-Origin", "*"); //no matter what domain it comes from, access granted
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"); //allow other headers
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, PUT, OPTIONS"); //allow other HTTP methods
  next(); //so it moves on to next middleware
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  }); // .body is added due to body parser
  post.save().then(createdPost => {
      res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    }); // 200 means everything ok
    //201 means we added new resource
    //no next() as we already have a response

  });
});

app.put("/api/posts/:id", (req, res, next) => {
 const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
 });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update Succesful"});
  })
});

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "Post not found!"});
    }
  })
});

app.get("/api/posts", (req,res,next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: documents
    }); // find allows u to find all or specific item in collection
  });
});

app.delete("/api/posts/:id", (req,res,next) => {
 Post.deleteOne({_id: req.params.id}).then(result => {
  console.log(result);
  res.status(200).json({messsage: "Post deleted"});
 });
});


module.exports = app;
//export the entire app module, incl the methods

