require('dotenv-defaults').config()
import { verify } from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'
import Account from '../schema/Account'

export const verifyToken = async (context) => {
    const authorization = context.req.headers["authorization"];

    if(!authorization){
        throw new Error("not authorization");
    }

    try{
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_KEY);
        context.payload = payload;
    }catch(err){
        throw new Error("not authorization");
    }
}