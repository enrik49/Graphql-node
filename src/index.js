const { GraphQLServer } = require('graphql-yoga');

//dummy data
let links = [{
    id: 'link-0',
    url: 'www.aaaa.com',
    description: 'Fullstack tutorial for GraphQL'
  },
  {
    id: 'link-1',
    url: 'www.aaaa.com',
    description: 'Fullstack tutorial for GraphQL'
  }]
let idCount = links.length



const resolvers = {
    Query: {
        info:() => `This is the API`,
        
        feed: () => links,
        
        link: (parent, args) => {
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
        },

        updateLink: (parent, args) => {
            const index = links.findIndex(element => element.id == args.id)
            if (args.description) 
                links[index].description = args.description
            if (args.url) 
                links[index].url = args.url
            return links.find(element => element.id == args.id)
        },
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start(() => console.log('Server is running on port 4000'))