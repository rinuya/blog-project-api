var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
    {
        content: {type: String, required: true},
        date: {type: Date, required: true},
        author: {type: String, required: true},
        approved: {type: Boolean, required: true, default: false},
        postid: {type: Schema.Types.ObjectId, ref: "Post"}
    }
)



module.exports = mongoose.model ("Comment", CommentSchema);