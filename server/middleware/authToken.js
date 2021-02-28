import jwt from 'jsonwebtoken'

const authenticateToken = (req, _, next) => {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    req.token = authHeader

    next()
}

export default authenticateToken