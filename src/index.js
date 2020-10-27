const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const resolvers = {
    Query: {
        info:() => `This is the API`,
        
        feed: async(parent, args, context) => {
            return context.prisma.link.findMany()
        },
        
        link: (parent, args, context) => {
            return context.prisma.link.findOne({
                where:{id:parseInt(args.id)}
            })
        },
    },

    Mutation:{
        createLink: (parent, args, context) => {
            return context.prisma.link.create({
                data:{
                    url: args.url,
                    description: args.description
                },
            })
        },

        updateLink: (parent, args, context) => {
            return context.prisma.link.update({
                where: { id: parseInt(args.id)},
                data: {
                    description: args.description,
                    url: args.url
                }
            })
        },

        deleteLink: (parent, args, context) => {
            return context.prisma.link.delete({
                where: { id: parseInt(args.id)}
            })
        }
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