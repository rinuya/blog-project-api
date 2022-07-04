var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
    {
        title: {type: String, required: true},
        content: {type: String, required: true},
        img: { data: Buffer, contentType: String},
        tags: [{type: String}], 
        date: {type: Date, required: true},
        author: {type: Schema.Types.ObjectId, ref: "User", required: true},
        comments: [{type: Schema.Types.ObjectId, ref: "Comment", required: true, default: "Rinuya"}],
        public: {type: Boolean, required: true, default: false}
    }
)



module.exports = mongoose.model ("Post", PostSchema);