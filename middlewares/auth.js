const jwt = require('jsonwebtoken');
const { generateID } = require('../utils');
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;



const generateToken = (user) => {
    const payload = { ...user, id: generateID() }
    return jwt.sign(payload, jwtSecret, { expiresIn: "1d" });
}

const auth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json('You need to be logged in to perform this action');
    }

    const token = authorization.split(" ")[1];
    jwt.verify(token, jwtSecret, (err, payload) => {
        if (err) {
            return res.status(403).json(err);
        }
    })
    req.user = user;
    next()
}

module.exports = {
    auth, generateToken
}