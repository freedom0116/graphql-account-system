import jwt from 'jsonwebtoken'

const authenticateToken = (req, _, next) => {
    const authHeader = req.headers['authorization']
    console.log("1", authHeader)

    next()
}

export default authenticateToken