const {model, Schema} = require('mongoose');

const commentsSchema = new Schema({
    user_id: String,
    body: String,
    product_id: String,
    createdAt: Date,
    likes: Number,
    reply:[{
        user_id: String,
        body: String,
        Likes: String
    }] 
});

module.exports = model('comment' , commentsSchema);