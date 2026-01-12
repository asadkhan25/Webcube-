import express from 'express';
import {
    getAllPosts,
    createPost,
    getPostById
} from '../controllers/post.controller.js';

const router = express.Router();

router.route('/')
    .get(getAllPosts)
    .post(createPost);

router.route('/:id')
    .get(getPostById);

export default router;
