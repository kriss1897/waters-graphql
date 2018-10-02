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
mongoose.connect('mongodb://127.0.0.1:27017/waters', {
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

httpServer.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
});