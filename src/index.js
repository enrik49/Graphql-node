const { GraphQLServer, PubSub } = require('graphql-yoga');
const { PrismaClient } = require("@prisma/client");

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')

const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

const prisma = new PrismaClient()
const pubsub = new PubSub()

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request, 
            prisma,
            pubsub,
        }
    },
});

const options = {
    //playground: true
}

server.start(options,() => console.log('Server is running on port 4000'))