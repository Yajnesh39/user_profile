const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { blacklistToken } = require('../middleware/authMiddleware');

const generateToken = (id) => {
    return jwt.sign({ id }, 'your_jwt_secret', { expiresIn: '30d' });
};

//register user profile
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id)
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//login user profile - generates token
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user.id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//update user profile - requires token in authorization (bearer)
exports.updateUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (user) {
            user.username = username || user.username;
            user.email = email || user.email;
            if (password) {
                user.password = password;
            }
            await user.save();
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user.id)
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//delete user - requires token in authorization (bearer)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//logout user - requires token in authorization (bearer)
exports.logoutUser = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }

        blacklistToken(token);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};