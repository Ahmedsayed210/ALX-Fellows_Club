import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
    getUser,
    getUserFriends,
    addremoveFriend
} from '../controllers/users.js';

const router = express.Router();

// read the api 
router.get('/:id',verifyToken, getUser);
router.get('/:id/friends',verifyToken, getUserFriends);


// add or remove friend it's mean update the api
router.patch('/:id/:friendId',verifyToken, addremoveFriend);

export default router;
