const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');

// List Users
router.get('/', protect, userController.listUsers);


// Create a User
router.post('/create', userController.createUser);


// Login User
router.post('/login', userController.loginUser);



// Read Logged-In-User
router.get('/loggedInUser', protect, userController.readLoggedInUser);

// Update Logged-In-User
router.put('/loggedInUser', protect, userController.updateLoggedInUser);



// Read Logged-In-User Friends
router.get('/loggedInUser/friends', protect, userController.readLoggedInUserFriends);

// Accept Friend
router.put('/loggedInUser/friends/:id', protect, userController.acceptFriend);



// Read User
router.get('/:id', protect, userController.readUser);

// Add User as Friend
router.put('/:id', protect, userController.addFriend);




module.exports = router;
