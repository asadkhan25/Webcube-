import express from 'express';
import {
    getAllUsers,
    createUser,
    getUserById
} from '../controllers/user.controller.js';

const router = express.Router();

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .get(getUserById);

export default router;
