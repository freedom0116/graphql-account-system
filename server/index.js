require('dotenv-defaults').config()
import { ApolloServer, PubSub } from 'apollo-server-express'
import mongoose from 'mongoose'
import express from 'express'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

import { resolvers } from './graphql/resolvers'
import { typeDefs } from './graphql/TypeDefs'
import verifyToken from './middleware/verifyToken'

const ACCESS_TOKEN_KEY =  process.env.ACCESS_TOKEN_KEY
const pubsub = new PubSub()

const startServer = async () => {
    const app = express();

    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        context: ({ req, res }) => ({ req, res }) 
    })

    app.use(cookieParser())

    app.use((req, res, next) => {
        try{
            console.log(req.cookies)
            const accessToken = req.cookies['access-token']
            const data = jwt.verify(accessToken, ACCESS_TOKEN_KEY)
            req.id = data.id
        }catch{}
        
        next()
    })

    if (!process.env.MONGO_URL) {
        console.error('Missing MONGO_URL!!!')
        process.exit(1)
    }

    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const db = mongoose.connection

    db.on('error', error => console.error('Connection error', error))
    db.once('open', () => console.log('Connected to MongoDB'))

    server.applyMiddleware({ app, path: '/' })

    app.listen({ port: process.env.PORT | 4000 }, () => {
        console.log(`The server is up on port ${process.env.PORT | 4000}!`)
    })
}

startServer();