const jwt = require('jsonwebtoken');
const { generateID } = require('../utils');
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;



const generateToken = (user) => {
    const payload = { ...user }
    return jwt.sign(payload, jwtSecret, { expiresIn: "1d" });
}

const auth = (req, res, next) => {
    const token = req.cookies.token
    console.log(token)
    if (!token) {
        return res.status(401).json('You need to be logged in to perform this action');
    }
    jwt.verify(token, jwtSecret, (err, payload) => {
        if (err) {
            return res.status(403).json({ err, message: err.message.replace('jwt', 'token') });
        }
        req.user = payload;
    })

    next()
}

module.exports = {
    auth, generateToken
}