const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
//for logout purpose
const blacklistedTokens = new Set();

//authorize with valid token
const authorize = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            if (blacklistedTokens.has(token)) {
                return res.status(401).json({ message: 'Token is blacklisted' });
            }

            const decoded = jwt.verify(token, 'your_jwt_secret');
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (err) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const blacklistToken = (token) => {
    blacklistedTokens.add(token);
};

module.exports = { authorize, blacklistToken };
