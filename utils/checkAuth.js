const {AuthenticationError} = require('apollo-server');
const jwt =  require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: "./config/config.env"});

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;

    if(authHeader){
        const token = authHeader.split('Bearer ')[1];

        try{
            const user = jwt.verify(token , process.env.SECRET);
            return user;
        }catch(err){
            throw new AuthenticationError('Invalid Token');
        }

        throw new Error('Auth token must be in the formet bearer [token]');
    }

    throw new Error('Auth header not present');
}
