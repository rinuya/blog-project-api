var Post = require("../models/post")
var Comment = require("../models/comment")
var async = require('async');
const { body,validationResult } = require('express-validator');


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

exports.get_single_post = function (req, res, next) {
    let title = req.body.title;
    
    Post.find({"title": title})
        .populate("comments")
        .exec(function (err, result) {
            if (err) { return next(err); }
            res.json({"post": result})
        })
        
}