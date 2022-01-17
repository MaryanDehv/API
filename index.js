const mongoose = require('mongoose');
const express = require('express');
const {ApolloServer} = require('apollo-server');
const app = express();
const cors = require('cors');

const resolvers =  require('./resolvers/index');
const typeDefs = require('./types/typeDefs');

const dotenv = require('dotenv');
dotenv.config({path: "./config/config.env"});

app.use(cors());

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
});

mongoose.connect(process.env.MONGODB , {useNewurlParser: true})
.then(() => {return server.listen({port: process.env.PORT})})
.then((res) => {console.log(`Server running at ${process.env.PORT}`)});