require('dotenv-defaults').config()
import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'
import Account from '../schema/Account'
import generateToken from './generateToken'

const verifyToken = async (req, res) => {
    if(!req.id){ 
        res.clearCookie('access-token')
        res.clearCookie('refresh-token')
        throw new AuthenticationError('access token is not valid')
    }

    const refreshToken = req.cookies['refresh-token']
    const account = await Account.findOne({ id: req.id })

    if(!account || account.token != refreshToken){
        res.clearCookie('access-token')
        res.clearCookie('refresh-token')
        throw new AuthenticationError('refresh token is not valid')
    }

    const result = generateToken(req, res)
    await Account.updateOne({ id: req.id }, { token: result.refreshToken })
}

export default verifyToken