import * as userService from '../services/user.service.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all users with roles and posts
// @route   GET /api/users?page=1&limit=10&search=john&sortBy=createdAt&sortOrder=desc
// @access  Public
export const getAllUsers = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        search = '',
        sortBy = 'createdAt',
        sortOrder = 'desc'
    } = req.query;

    const result = await userService.getAllUsers({
        page: parseInt(page),
        limit: parseInt(limit),
        search,
        sortBy,
        sortOrder,
        includeRoles: true,
        includePosts: true
    });

    res.json({
        success: true,
        data: result.users,
        pagination: result.pagination
    });
});


// @desc    Create a new user
// @route   POST /api/users
// @access  Public
export const createUser = asyncHandler(async (req, res) => {
    const { email, name, password, roleIds } = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400);
        throw new Error('Email and password are required');
    }

    // Create user using service
    const user = await userService.createUser({
        email,
        name,
        password,
        roleIds
    });

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user
    });
});


// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
export const getUserById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id, {
        includeRoles: true,
        includePosts: true
    });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json({
        success: true,
        data: user
    });
});
