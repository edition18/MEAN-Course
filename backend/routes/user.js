//implement login or signup routes here
const express = require("express");
const bcrypt = require('bcrypt');
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const router = express.Router();


router.post("/signup", (req,res,next) => {
  bcrypt.hash(req.body.password, 10).then(hash =>{
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });
    user.save()
    .then(result =>{
      res.status(201).json({
        message: "User Created",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
  });
});


router.post("/login", (req,res,next) => {
  user.find({ email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      //proceed if user found
      return bcrypt.compare(req.body.password, user.password);

    }).then(result =>{
        if (!result) {
          return res.status(401).json({
            message: "Auth Failed"
          });
        }
        const token = jwt.sign({email: user.email, userId: user._id}, "secret_this_should_be_longer", {expiresIn: "1h"});
    }).catch(err => {
      return res.status(401).json({
        message: "Auth Failed"
      });
    });

});

module.exports = router;
