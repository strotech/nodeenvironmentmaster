const hapi=require('hapi');
const mongoose=require('mongoose');
const {ApolloServer} = require('apollo-server-hapi');
const { makeExecutableSchema } = require('graphql-tools');
const Inert = require('inert');
const Vision = require('vision');
const Handlebars = require('handlebars');

const shows=require('./models/shows');
var routes=require('./routes.js');




var mongoDB="mongodb+srv://cluster0-barww.mongodb.net/shows";
var mongoDBcreds={"user": "sijils", "pass": "m0ng00$e"};


mongoose.connect(mongoDB,mongoDBcreds);
mongoose.connection.once('open',()=>{
    console.log("connected to database");
})
const graphqlSchema = require('./graphql/schema');
const createResolvers = require('./graphql/resolvers');

const executableSchema = makeExecutableSchema({
    typeDefs: [graphqlSchema],
    resolvers: createResolvers(shows),
  });


const server = new ApolloServer({
    schema:executableSchema
  });


async function start_server() {

    const app=hapi.server({
        port: 4000,
        host:'localhost'
    });
    await app.register(Inert);
    await app.register(Vision);

    await routes(app);
    await server.applyMiddleware({ app });
    try {    
        await app.start();
        console.log(`Server is running at: ${app.info.uri}`);
    } catch (err) {
        console.log(`Error while starting server: ${err.message}`)
    }
}


start_server();