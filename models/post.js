var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
    {
        title: {type: String, required: true},
        content: {type: String},
        preview: {type: String},
        // img: { data: Buffer, contentType: String},
        tags: [{type: String}], 
        date: {type: Date, required: true},
        author: {type: String, default: "Rinuya"},
        comments: [{type: Schema.Types.ObjectId, ref: "Comment",}],
        public: {type: Boolean, required: true, default: false}
    }
)



module.exports = mongoose.model ("Post", PostSchema);