require('dotenv-defaults').config()
import jwt from 'jsonwebtoken';

export const createAccessToken = (_id) => {
    return jwt.sign({ userId: _id }, process.env.ACCESS_TOKEN_KEY, { 
        expiresIn: '15s' 
    });
};

export const createRefreshToken = (_id) => {
    return jwt.sign({ userId: _id }, process.env.REFRESH_TOKEN_KEY, { 
        expiresIn: '7d' 
    });;
}