require('dotenv-defaults').config()
import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_KEY =  process.env.ACCESS_TOKEN_KEY
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY

const generateToken = (req, res) => {
    const result = {}
    result.accessToken = jwt.sign({ id: req.id }, ACCESS_TOKEN_KEY, { expiresIn: '15s' })
    result.refreshToken = jwt.sign({ id: req.id }, REFRESH_TOKEN_KEY, { expiresIn: '7d' }) 
    
    // day hr min sec millisecond
    res.cookie('access-token', result.accessToken, 
                { 
                    expires: new Date(Date.now() + 15 * 1000),  // 15s
                    httpOnly: true, 
                    path: '/'
                })
    res.cookie('refresh-token', result.refreshToken, 
                { 
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),  // 7d
                    httpOnly: true , 
                    path: '/'
                })

    return result
}

export default generateToken