const jwt =  require('jsonwebtoken')
const bcryptjs =  require('bcryptjs')
const dotenv = require('dotenv');
const {registerValidator} = require('../utils/validateInputs');

const {UserInputError} = require('apollo-server');
dotenv.config({path: "./config/config.env"});



// Models
const User = require('../models/Users');

function sign(item){
    return jwt.sign({
        id: item.id,
        email: item.email,
        user: item.user
    }, process.env.SECRET , {expiresIn: '1h'});
}


module.exports = {
    Query:{
        async getUsers(){
            const users = await User.find();
            return users;
        },
    } ,
    Mutation:{
        async registerUser(_,{registerInput: {user, email, password, image, confirmPassword}} , context,info){

            const {error , valid} = registerValidator(user, email, password, confirmPassword);
            

            if(!valid){
                throw new UserInputError('Errors' , {error});
            }

            password = await bcryptjs.hash(password, 12);

            const newUser = new User({
                user,
                email,
                image,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = sign(res);

            return{
                ...res._doc,
                id:res._id,
                token
            }

            
        } ,
        async login(_, {username , password}){
            const user = await User.findOne({username});

            const match = await bcryptjs.compare(password , user.password);

            const res = await user.save();

            if(match){
                const token = sign(res);

                return {
                    ...res._doc,
                    id: res._id,
                    token
                }
            } else {
                throw new Error('Wrong Credentials');
            }
        }
    }
}