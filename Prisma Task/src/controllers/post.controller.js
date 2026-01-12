import prisma from '../config/database.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all posts with author
// @route   GET /api/posts
// @access  Public
export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await prisma.post.findMany({
        include: { author: true }
    });
    res.json(posts);
});

// @desc    Create a new post
// @route   POST /api/posts
// @access  Public
export const createPost = asyncHandler(async (req, res) => {
    const { title, content, published, authorId } = req.body;

    const post = await prisma.post.create({
        data: {
            title,
            content,
            published: published || false,
            authorId: parseInt(authorId)
        },
        include: { author: true }
    });

    res.status(201).json(post);
});

// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = asyncHandler(async (req, res) => {
    const post = await prisma.post.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { author: true }
    });

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    res.json(post);
});
