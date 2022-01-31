const {model , Schema} = require('mongoose');

const ProductsSchema = new Schema({
    title: String,
    category: String,
    description: String,
    status: String,
    price: String,
    minimum_amount: String,
    suggested_amount: String,
    product_owner: String,
    visibility: String,
    createdAt: Date,
    cover: String,
    features: [{
        name: String,
    }],
    tags:[{
        tag_name: String
    }],
    compatibility:[{
        compat_name: String
    }],
    comments:[{
        body: String,
        user: String,
        createdAt: Date
    }]
});

module.exports = model('Product' , ProductsSchema);