const express = require("express");
const Post = require('../models/post');
const router = express.Router();

const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mime type");
    if (isValid) {
       error = null;
    }
    cb(null, "backend/images")
    //callback needs 2 arg, whether u detected an error and the path to store it
    //**path is relative to the server.js file
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split("-").join(" ");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "," + ext);
  }
});

router.post("",checkAuth, multer({storage: storage}).single("image") ,(req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  }); // .body is added due to body parser
  post.save().then(createdPost => {
      res.status(201).json({
      message: "Post added successfully",
      post: {
        ...createdPost,
        id: createdPost._id
      }
    }); // 200 means everything ok
    //201 means we added new resource
    //no next() as we already have a response
  });
});

router.put("/:id",checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    // if this is truthy, a new file was uploaded
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
     _id: req.body.id,
     title: req.body.title,
     content: req.body.content,
     imagePath: imagePath
  });
   Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
     if (result.nModified > 0){
      res.status(200).json({ message: "Update Succesful"});
     } else {
      res.status(401).json({ message: "Not Authorized"});
     }
   })
 });

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "Post not found!"});
    }
  })
});

router.get("", (req,res,next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  // we add a + infront to change these from strings to values
  const postQuery = Post.find();
  let fetchedPosts; //init
  //mongoose allow for structuring of querys
  // by chaining multiple query methods to narrow
  // down the search

  if (pageSize && currentPage) { //truthy
    postQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  postQuery.then(documents => {
    fetchedPosts = documents;
    return Post.count();
  }).then(count => {
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: fetchedPosts,
      maxPosts: count
    });
  });
});

router.delete("/:id",checkAuth, (req,res,next) => {
 Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
  if (result.n > 0){
    console.log(result);
    res.status(200).json({ message: "Deletion Succesful"});
   } else {
    res.status(401).json({ message: "Deletion Not Authorized"});
   }
 });
});


module.exports = router;
