const { GraphQLServer } = require('graphql-yoga');

//dummy data
let links = [{
    id: 'link-0',
    url: 'www.aaaa.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

const resolvers = {
    Query: {
        info:() => `This is the API`,
        feed: () => links,
    },

    Link:{
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }

}

const server = new GraphQLServer({
    typeDefs: './src/shcema.graphql',
    resolvers
});

server.start(() => console.log('Server is running on port 4000'))