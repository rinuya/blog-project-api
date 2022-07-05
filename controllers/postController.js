var Post = require("../models/post")
var async = require('async');
const { body,validationResult } = require('express-validator');

exports.create_post = [

    (req, res, next) => {
  
        let post = new Post({
            title: req.body.title,
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