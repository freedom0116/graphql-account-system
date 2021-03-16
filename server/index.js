require('dotenv-defaults').config()
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import express from 'express';

import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/TypeDefs';

const startServer = async () => {
    const app = express();

    if (!process.env.MONGO_URL) {
        console.error('Missing MONGO_URL!!!');
        process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;

    db.on('error', error => console.error('connection error', error));
    db.once('open', () => console.log('Connected to MongoDB'));

    const apolloServer = new ApolloServer({ 
        typeDefs, 
        resolvers,
        context: ({ req, res }) => ({ req, res }) 
    });

    apolloServer.applyMiddleware({ app, path: '/' });

    app.listen({ port: process.env.PORT | 4000 }, () => {
        console.log(`The server is up on port ${process.env.PORT | 4000}!`)
    });
}

startServer();