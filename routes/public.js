var express = require('express');
var express = require('express');
const currentUser = require('../middlewares/currentUser');
var router = express.Router();

const User = require("../models/user");

const jwt = require('jsonwebtoken');
const passport = require("passport");
const bcrypt = require("bcryptjs");
require('dotenv').config();

// public accessible (client API calls)


// login and get token:
router.post("/adminlogin", function(req, res, next) {
  console.log(req.body)
  // verify credentials and attach JWT token
  // passport.authenticate("local", {session: false}, (err, user, info) => {
  //   if (err) {
  //     return res.status(400).json({
  //       message: "Something went wrong, error",
  //       user: user
  //     });
  //   }
  //   if (!user) {
  //     return res.status(400).json({
  //       message: "Something went wrong, no user",
  //       user: user
  //     });
  //   }
  //   req.login(user, {session: false}, (err) => {
  //     if (err) { res.send(err); }
  //     const token = jwt.sign({ user }, process.env.JWT_SECRET, {expiresIn: "1d"});
  //     return res.json({user, token});
  //   });
  // })(req, res)
})


// get all public posts
router.get('/posts', function(req, res, next) {
  res.send("hi!");
});

// get single public post
router.get('/posts/post:id', function(req, res, next) {
  res.send('hi');
});

// get comments (prob not necessary since it ll be passed in with post)
router.get('/posts/post:id/comments', function(req, res, next) {
  res.send('hi');
});

// get single comment (prob not necessary aswell)
router.get('/posts/post:id/comments/comment:id', function(req, res, next) {
  res.send('hi');
});

// post comment
router.post('/posts/post:id/comments/comment:id', function(req, res, next) {
  res.send('hi');
});


module.exports = router;
