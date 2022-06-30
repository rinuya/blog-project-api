var express = require('express');
var router = express.Router();

const User = require("../models/user");
// Private views

// get all posts
router.get('/posts', function(req, res, next) {
  User.findOne({}).exec(function(err, user){
    if (err) {return next(err);}
    res.render("index", {user: user})
  })
});

router.post("/posts", function (req, res, next){
  const user= new User({
    username: "test",
    password: "test",
  })
  user.save(function (err){
    res.redirect("/posts")
  })
})

// get single post
router.get('/posts/post:id', function(req, res, next) {
  res.send('hi');
});

// create a post
router.post('/posts/post:id', function(req, res, next) {
  res.send('hi');
});

// delete a post
router.post('/posts/post:id', function(req, res, next) {
  res.send('hi');
});

// edit a post
router.put('/posts/post:id', function(req, res, next) {
  res.send('hi');
});

// get comments (used for checking new/unapproved commments)
router.get('/posts/post:id/comments', function(req, res, next) {
  res.send('hi');
});

// get a single comment (prob not used)
router.get('/posts/post:id/comments/comment:id', function(req, res, next) {
  res.send('hi');
});

// post a comment
router.post('/posts/post:id/comments/comment:id', function(req, res, next) {
  res.send('hi');
});

// delete a comment
router.delete('/posts/post:id/comments/comment:id', function(req, res, next) {
  res.send('hi');
});

// edit a comment
router.put('/posts/post:id/comments/comment:id', function(req, res, next) {
  res.send('hi');
});



module.exports = router;
