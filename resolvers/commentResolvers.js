const checkAuth = require('../utils/checkAuth')

// Models
const Comment = require('../models/Comments');
const Product = require('../models/Products');
const User = require('../models/Users');
const UserActions = require('../models/userActions');

module.exports = {
    Query:{
        async getComments(){
            const comments = await Comment.find();

            return comments;
        }
    },
    Mutation:{
        async postComment(_, {body , productID}, context){

            const currentUser = checkAuth(context);
            const user = await User.findOne({user: currentUser.user});
            const product = await Product.findById(productID);

            if(user){

                const newComment = new Comment({
                    user_id: user.user,
                    body,
                    product_id: product.title,
                    likes: 0,
                    createdAt: new Date().toISOString()
                });

                const res = await newComment.save();

                product.comments.unshift({
                    user_id: user.user,
                    body,
                    createdAt: new Date().toISOString()
                });

                await product.save();

                const newAction =  new UserActions({
                    user_id: user.user,
                    action: {
                        actionType: 'Comment',
                        body,
                        product_id: product.title
                    },
                    createdAt: new Date().toISOString()
                });

                await newAction.save();

                return res;

            } else {
                throw new Error('something is wrong');
            }
        } ,  async reply(_,{body, commentID}, context){
            
            const user = checkAuth(context);

            const comment = await Comment.findById(commentID);

            comment.reply.unshift({
                body,
                user_id: user.user,
                createdAt: new Date().toISOString()
            });

            await comment.save();

            return comment;
        }
         , async like(_,{commentID , productID}, context, info){

            const user = checkAuth(context);
            const comment = await Comment.findById(commentID);
            const findAction = await UserActions.findOne({comment_id: commentID});

            let likeCount = comment.likes;
            await Comment.updateOne({likes: likeCount } , {$set:{likes: likeCount + 1}});

            const newAction = new UserActions({
                user_id: user.user,
                action: {
                    actionType: 'Like',
                    comment_id: commentID
                },
                createdAt: new Date().toISOString()
            });

            await newAction.save();

            return findAction;


        }
    }
}
