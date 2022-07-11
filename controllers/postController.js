var Post = require("../models/post")
var Comment = require("../models/comment")
var async = require('async');
const { body,validationResult } = require('express-validator');
const { DateTime } = require("luxon");


exports.create_post = [

    (req, res, next) => {
  
        let post = new Post({
            title: req.body.title,
            preview: req.body.preview,
            content: req.body.content,
            tags: req.body.tags,
            date: req.body.date,
            author: "Rinuya",
            comments: [],
            public: false,
        })
        post.save(function (err) {
            if (err) {
                return next(err);
            }
        res.json({"success": true, "message":"Blogpost successfully created!"})
        });
    }
]

// all posts for private route
exports.get_all_posts = function (req, res, next) {

    let page = req.body.page;
    let postPerPage = req.body.postPerPage;
    let onlyPublic = req.body.filter.onlyPublic;
    let onlyPrivate = req.body.filter.onlyPrivate;
    let filter = "";

    if (onlyPublic) {
        filter = "{public: true}";
    }
    if (onlyPrivate) {
        filter = "{public: false}";
    }
    if (onlyPublic && onlyPrivate) {
        filter = "";
    }
 
    async.parallel({
        public_post_count: function(done){
            Post.countDocuments({public: true}, done)
        },
        private_post_count: function(done){
            Post.countDocuments({public: false}, done)
        },
        all_posts: function(done){
            Post.find({filter}).sort({date: 1}).skip((page-1)*postPerPage).limit(postPerPage).exec(done)
        }
        }, function (err, results) {

            if (err) { 
                return next(err);
            }
            if (results.all_posts==null) {
                var err = new Error("No posts available");
                err.status = 404;
                return next(err);
            }
            // Successful, so send response
            res.json({"public_post_count": results.public_post_count, "private_post_count": results.private_post_count, "posts": results.all_posts});
        }
    ) 
}


exports.get_all_comments = function (req, res, next) {
  
    async.parallel({
        public: function(done){
            Comment.countDocuments({approved: true}, done)
        },
        private: function(done){
            Comment.countDocuments({approved: false}, done)
        },
        all_comments: function(done){
            Comment.find({}).sort({date: 1}).exec(done)
        }
        }, function (err, results) {
             
            if (err) { 
                return next(err);
            }
            if (results.all_comments==null) {
                var err = new Error("No posts available");
                err.status = 404;
                return next(err);
            }
            // Successful, so send response
            
            res.json({"public": results.public, "private": results.private, "comments": results.all_comments});
        }
    ) 
}


exports.get_single_post = function (req, res, next) {
    let title = req.body.title;
    
    Post.find({"title": title})
        .populate("comments")
        .exec(function (err, result) {
            if (err) { return next(err); }
            res.json({"post": result})
        })
        
}

exports.get_single_public_post = function (req, res, next) {
    let title = req.body.title;
    
    Post.find({"title": title}, {"public": true})
        .populate("comments")
        .exec(function (err, result) {
            if (err) { return next(err); }
            if (result==null){
                return
            }
            res.json({"post": result})
        })
}

exports.create_comment = [
    body("author", "").escape(),
    body("content", "").escape(),
    body("postid", "").escape(),

    async (req, res, next) => {
        
        let comment = new Comment({
            ...req.body, 
            date: DateTime.now(),
            approved: false 
        });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return;
        }
        comment.save(function (err) {
            if (err) {
                return next(err);
            }
       
        })
        Post.findById(req.body.postid).exec(function (err, updatedpost){
            if (err) {
                return next(err);
            }
            if (updatedpost==null) {
                var err = new Error("No posts available");
                err.status = 404;
                return next(err);
            }
            updatedpost.comments = [...updatedpost.comments, comment._id];
            Post.findByIdAndUpdate(req.body.postid, updatedpost, {}, function (err){
                if (err) {
                    return next(err);
                }
                res.json({"success": true, "message":"Comment successfully created!"})
            })
        })   
    }
]

exports.delete_comment = function (req, res, next) {
    let post;
    Post.findOne({comments : req.params.id}).exec(function(err, result){
        if (err) { return next(err); }
        post = result;
        let newComments = post.comments
        newComments.splice(newComments.findIndex(e => e === req.params.id), 1)
        post = {...post, comments: newComments}
        console.log(post)
        Post.findByIdAndUpdate(result._id, post, {}, function(err, newPost){
            if (err) { return next(err); }
            console.log("This is the new post");
            console.log(newPost);
            Comment.findByIdAndDelete(req.params.id, function deleteComment(err){
                if(err) {return next(err);}
                console.log("Comment deleted")
                res.json({"success": true, "message":"Comment successfully deleted!"});
            })
        })
    })
}

exports.approve_comment = function (req, res, next) {   
    Comment.findByIdAndUpdate(req.params.id, {approved: true}, function(err, updatedComment) {
        if (err) { return next(err); }
        console.log(updatedComment);
        res.json({"success": true, "message":"Comment successfully approved!"})
    })
}