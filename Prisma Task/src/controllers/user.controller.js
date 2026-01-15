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


// @desc    Update user by ID
// @route   PATCH /api/users/:id
// @access  Public
export const updateUser = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;

    // Validate that at least one field is provided
    if (!email && !name && !password) {
        res.status(400);
        throw new Error('At least one field (email, name, or password) is required for update');
    }

    // Update user using service
    const updatedUser = await userService.updateUser(req.params.id, {
        email,
        name,
        password
    });

    res.json({
        success: true,
        message: 'User updated successfully',
        data: updatedUser
    });
});


// @desc    Delete user by ID
// @route   DELETE /api/users/:id
// @access  Public
export const deleteUser = asyncHandler(async (req, res) => {
    // Delete user using service
    const deletedUser = await userService.deleteUser(req.params.id);

    res.json({
        success: true,
        message: 'User deleted successfully',
        data: {
            id: deletedUser.id,
            email: deletedUser.email,
            name: deletedUser.name
        }
    });
});
