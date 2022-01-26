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
        async getUser(_,{user}){
            const users = await User.findOne({user: user})

            return users;
        }
    } ,
    Mutation:{
        async registerUser(_,{registerInput: {user, email, password, confirmPassword}} , context,info){

            const {error , valid} = registerValidator(user, email, password, confirmPassword);
            

            if(!valid){
                throw new UserInputError('Errors' , {error});
            }

            password = await bcryptjs.hash(password, 12);

            const newUser = new User({
                user,
                email,
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
            const user = await User.findOne({user: username});
            const match = await bcryptjs.compare(password , user.password);
            const res = await user.save();

            console.log(user);

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