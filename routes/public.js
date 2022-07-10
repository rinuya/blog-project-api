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

var post_controller = require("../controllers/postController");



// login and get token:
router.post("/adminlogin", function(req, res, next) {
  // console.log(req.body)
  // verify credentials and attach JWT token
  passport.authenticate("local", {session: false}, (err, user, info) => {
    if (err) {
      return res.status(400).json({
        message: "Something went wrong, error",
        user: user.username
      });
    }
    if (!user) {
      return res.status(400).json({
        message: "Something went wrong, no user",
        user: user.username
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) { res.send(err); }
      console.log(typeof(user))
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
      return res.json({user, token});
    });
  })(req, res)
})


// get all public posts
router.get('/posts', function(req, res, next) {
  res.send("hi!");
});

//just for test
router.post('/posts', function(req, res, next) {
  res.json(
    {
      "greeting": "hi!",
    }
  );
});

// get single public post
router.get('/posts/post:id', post_controller.get_single_public_post);

// get single comment (prob not necessary aswell)
router.get('/posts/post:id/comments/comment:id', function(req, res, next) {
  res.send('hi');
});

// post comment
router.post('/posts/:id/comments/create-comment', post_controller.create_comment);


module.exports = router;
