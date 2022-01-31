const checkAuth = require('../utils/checkAuth');

// Models 
const Product = require('../models/Products');
const Category = require('../models/Categories');
const UserActions =  require('../models/userActions');

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
        async addProduct(_ , {title , price , category , status , description , visibility, minimum_amount , suggested_amount , tags , features , compatibility , cover_image} , context){

            const user = checkAuth(context);

            const doesProductExist = await Product.findOne({title: title});

            if(doesProductExist == null){
                const product =  new Product({
                    title,
                    category,
                    price,
                    visibility,
                    cover_image,
                    status,
                    description,
                    features,
                    minimum_amount,
                    suggested_amount,
                    tags,
                    compatibility,
                    product_owner: user.user,
                    createdAt: new Date().toISOString()
                });

                await product.save();

                const doesCategoryExist = await Category.findOne({name: category});

                if(!doesCategoryExist){
                    const addCategory = new Category({
                        name: category
                    });
        
                    await addCategory.save();
                }

                return product;

            } else {
                throw new Error('A product already exists with that name , try something else');
            }

            
        } 
        // , async productActions(_,{action , productID} , context){

        //     const user = checkAuth(context);

        //     const product = Product.findById(productID);

        //     const newAction = new UserActions({
        //         user: user.user,
        //         action:{
        //             actionType: "like",
        //             body: "testing",
        //             product_id: productID,
        //         },
        //         createdAt: new Date().toISOString()
        //     });

        //     const res = await newAction.save();

        //     return product;
        // }
    }
}