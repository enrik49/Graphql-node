const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const resolvers = {
    Query: {
        info:() => `This is the API`,
        
        feed: async(parent, args, context) => {
            return context.prisma.link.findMany()
        },
        
        /*link: (parent, args) => {
            return links.find(element => element.id == args.id)
        },*/
    },

    Mutation:{
        post: (parent, args, context) => {
            const newLink = context.prisma.link.create({
                data:{
                    url: args.url,
                    description: args.description
                },
            })
            return newLink
        },

        /*updateLink: (parent, args) => {
            const index = links.findIndex(element => element.id == args.id)
            if (args.description) 
                links[index].description = args.description
            if (args.url) 
                links[index].url = args.url
            return links.find(element => element.id == args.id)
        },*/
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        prisma,
    }
});

server.start(() => console.log('Server is running on port 4000'))