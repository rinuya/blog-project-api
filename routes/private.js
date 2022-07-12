var express = require('express');
var router = express.Router();
var post_controller = require("../controllers/postController");
var async = require('async');
const User = require("../models/user");

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

router.post('/posts', post_controller.get_all_posts);

// get single post
router.post('/posts/post', post_controller.get_single_post);

// create a post
router.post('/create-post', post_controller.create_post);

// delete a post
router.delete('/posts/post/delete', post_controller.delete_post);

// publicize post
router.put('/posts/post/publicize', post_controller.publicize_post);

// privatize post
router.put('/posts/post/privatize', post_controller.privatize_post);

// edit a post
router.put('/posts/post/edit', post_controller.edit_post);

// get comments (used for checking new/unapproved commments)
router.get('/comments', post_controller.get_all_comments);

// delete a comment
router.delete('/comments/:id/delete', post_controller.delete_comment);

// approve a comment
router.put("/comments/:id/edit", post_controller.approve_comment);



module.exports = router;
