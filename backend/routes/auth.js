const jwt = require("jsonwebtoken")
const AUTH_SECRET  = require("../authsecret/secret")

const getToken = req => {
    const authorization = req.headers.authorization
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        return authorization.substring(7)
    }
    return null
}

const authReq = (req, res, next) => {
    const token = getToken(req)
    if (token) {
        jwt.verify(token, AUTH_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                   status: 1,
                    error: "Invalid token"
                })
            }
            req.user = decoded
            next()
        })
    } else {
        return res.status(401).json({
            status: 1,
            error: "No token provided"
        })
    }
}