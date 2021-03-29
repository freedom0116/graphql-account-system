require('dotenv-defaults').config()
import { verify } from 'jsonwebtoken';

export const verifyToken = (context) => {
    const authorization = context.req.headers["authorization"] || '';

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