const {model , Schema} = require('mongoose');

const ProductsSchema = new Schema({
    title: String,
    category_id: String,
    status: String,
    price: String,
    views: String,
    user_id: String,
    createdAt: Date,
    comments:[{
        body: String,
        user_id: String,
        createdAt: Date
    }]
});

// TODO: get all products within a certain category and add up the views to get a view for a specific time - you can calc view by checking how many times that route has been called uniquely. Use cookies to rule out non unique views.
// TODO: user that made the product will receive all comments as notifications

module.exports = model('Product' , ProductsSchema);