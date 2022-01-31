const userResolvers =  require('./userResolvers');
const productResolvers = require('./productResolvers');
const commentResolvers = require('./commentResolvers');
const User = require('../models/Users');

module.exports = {
    Comment:{
        async user(parent){
            const user = await User.find({user: parent.user_id});

            return user.find((item) => item.user === parent.user_id);
        }
    },
    UserActions:{
        async user(parent){
            const user = await User.find({user: parent.user_id});

            return user.find((item) => item.user === parent.user_id);
        }
    },
    Query: {
        ...userResolvers.Query,
        ...productResolvers.Query,
        ...commentResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...productResolvers.Mutation,
        ...commentResolvers.Mutation
    }
    
}