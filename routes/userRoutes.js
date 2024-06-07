const {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    logoutUser
} = require('../controllers/authController');
const { authorize } = require('../middleware/authMiddleware');
const express = require('express');

const router = express.Router();

//routes to implement end points
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update', authorize, updateUser);
router.delete('/delete', authorize, deleteUser);
router.post('/logout', authorize, logoutUser);

module.exports = router;
