var express = require('express');
var router = express.Router();
const { body,validationResult } = require('express-validator');

var async = require('async');





const User = require("../models/user");
// Private views



// ROUTES BELOW ARE JUST TO REGISTER ME ONCE
// router.get("/register", function(req, res, next){
//   res.render("index")
// })

// router.post("/register", function(req, res, next) {

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) { return };
//     if (req.body.register_secret != process.env.REGISTER_SECRET) { return }
//     bcrypt.hash(req.body.password, 10, (err, hashedPw) => {
//       if (err) { return next(err) };
//       const user= new User({
//         username: req.body.username,
//         password: hashedPw,
//       }).save(err => {
//         if (err) { return next (err);}
//       });
//     })
//   }
// )


// get all posts

router.get('/posts', function(req, res, next) {
  User.findOne({}).exec(function(err, user){
    if (err) {return next(err);}
    res.render("index", {user: user})
  })
});

router.post("/posts", function (req, res, next){
 
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
