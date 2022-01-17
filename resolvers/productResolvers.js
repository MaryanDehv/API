const checkAuth = require('../utils/checkAuth');

// Models 
const Product = require('../models/Products');
const User = require('../models/Users');
const Category = require('../models/Categories');
const UserActions =  require('../models/userActions');
const userResolvers = require('./userResolvers');

module.exports = {
    Query:{
        async getProducts(){
            const products = await Product.find();

            // const products = await Product.find({createdAt: {$gte: new Date("2022-01-02T03:11:46.022+00:00") , $lt: new Date("2022-01-10T03:11:46.022+00:00")}});
        
            return products;
        }, async getRecentActions(){
            const actions = await UserActions.find();

            return actions;
        }
    } ,

    Mutation: {
        async addProduct(_ , {title , price , category_id , status , views} , context){

            const user = checkAuth(context);

            const product =  new Product({
                title,
                category_id,
                price,
                status,
                views,
                user_id: user.user,
                createdAt: new Date().toISOString()
            });
            
            try{

                const exist = await Category.findOne({categoryName: category_id});

                if(!exist){
                    const addCategory = new Category({
                        name: category_id
                    });
        
                    await addCategory.save();
                }

            } catch(err){
                throw new Error(err);
            }

            await product.save();

            return product;
        } , async productActions(_,{action , productID} , context){
            const user = checkAuth(context);
            const product = Product.findById(productID);

            const newAction = new UserActions({
                user_id: user.user,
                action:{
                    actionType: "like",
                    body: "testing",
                    product_id: productID
                },
                createdAt: new Date().toISOString()
            });

            const res = await newAction.save();

            return product;

        }
    }
}