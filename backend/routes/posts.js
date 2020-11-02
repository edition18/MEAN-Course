const express = require("express");

const router = express.Router();
const PostController = require("../controllers/posts")

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

router.post("",checkAuth, multer({storage: storage}).single("image") ,PostController.createPost);

router.put("/:id",checkAuth, multer({storage: storage}).single("image"), PostController.updatePost);

router.get("/:id", PostController.getPost);

router.get("", PostController.getPosts);

router.delete("/:id",checkAuth, PostController.deletePost);


module.exports = router;
