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





// PUT request to display User details
router.put('/me', protect, userController.user_update_put); // should be /loggedInUser/update, updateLoggedInUser

// GET request to display User friends
router.get('/friends', protect, userController.user_friends_get); // should be /loggedInUser/friends, readLoggedInUserFriends

// GET request to display Profile details
router.get('/:id', protect, userController.user_profile_get); // readUserProfile



// PUT request to display Profile details
router.put('/:id', protect, userController.user_friendRequest_put); // should be /:id/friendRequests, updateLoggedInUserFriends

// PUT request to display Profile details
router.put('/acceptFriend/:id', protect, userController.user_acceptFriendRequest_put); // should be /:id/friendAcknowledgement, updateLoggedInUserFriends


module.exports = router;
