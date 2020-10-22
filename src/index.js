const { GraphQLServer } = require('graphql-yoga');

//dummy data
let links = [{
    id: 'link-0',
    url: 'www.aaaa.com',
    description: 'Fullstack tutorial for GraphQL'
  }]
let idCount = links.length



const resolvers = {
    Query: {
        info:() => `This is the API`,
        feed: () => links,
        link: (parent, args) => {
            console.log(links);
            console.log(args.id);
            return links.find(element => element.id == args.id)
        },
    },

    Mutation:{
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                url: args.url,
                description: args.description
            }
            links.push(link)
            return link
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start(() => console.log('Server is running on port 4000'))