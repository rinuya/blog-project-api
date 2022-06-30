var express = require('express');
const currentUser = require('../middlewares/currentUser');
var router = express.Router();

// public accessible (client API calls)

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
