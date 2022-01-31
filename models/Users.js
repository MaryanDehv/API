const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    user: String,
    email: String,
    password: String,
    createdAt: String,
    image: String
})

module.exports = model('User' , userSchema);
