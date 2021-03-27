require('dotenv-defaults').config()
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/TypeDefs';
import Account from './schema/Account';
import { createAccessToken, createRefreshToken } from './auth/auth'
import { sendRefreshToken } from './auth/sendRefreshToken';

const startServer = async () => {
    const app = express();
    app.use(cookieParser());

    // Design to handle refreshing jwt token
    app.post("/refresh_token", async (req, res) => {
        let token = req.cookies.jid;        
        if(!token){
            return res.send({ ok: false, accessToken: '' });
        }
        
        let payload = "";
        try{
            payload = verify(token, process.env.REFRESH_TOKEN_KEY);
        } catch(err){
            console.log(err);
            return res.send({ ok: false, accessToken: '' });
        }

        const account = await Account.findOne({ _id: payload.userId });
        if(!account){
            return res.send({ ok: false, accessToken: '' });
        }
        
        if(account.refreshToken !== token){
            return res.send({ ok: false, accessToken: '' });
        }

        token = createRefreshToken(payload.userId);

        await Account.updateOne({ _id: payload.userId }, { refreshToken: token });
        sendRefreshToken(res, token);

        return res.send({ ok: true, accessToken: createAccessToken(payload.userId) });
    })

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