const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');

// GraphQL
const schema = require('./graph/schema');
const resolvers = require('./graph/resolvers');

// Port Config
const PORT = 5000;

// Database Setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://kriss:18secret@ds121603.mlab.com:21603/waters', {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Apollo Server
const server = new ApolloServer({ 
    typeDefs:schema, 
    resolvers,
});

const app = express();
server.applyMiddleware({ app, path: '/graphql'});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
});