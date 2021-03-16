require('dotenv-defaults').config()
import jwt from 'jsonwebtoken';

export const createAccessToken = (id) => {
    return jwt.sign({ userId: id }, process.env.ACCESS_TOKEN_KEY, { 
        expiresIn: '15m' 
    });
};

export const createRefreshToken = (id) => {
    return jwt.sign({ userId: id }, process.env.REFRESH_TOKEN_KEY, { 
        expiresIn: '7d' 
    });;
}