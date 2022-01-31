const{model, Schema} = require('mongoose');

const UserActions = new Schema({
    user_id: String,
    action: {
        actionType: String,
        body: String,
        product_id: String,
        comment_id: String
    },
    createdAt: Date
});

module.exports = model('action' , UserActions);