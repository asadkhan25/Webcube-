import prisma from '../config/database.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all users with roles and posts
// @route   GET /api/users
// @access  Public
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany({
        include: {
            posts: true,
            roles: {
                include: {
                    role: true
                }
            }
        }
    });
    res.json(users);
});

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
export const createUser = asyncHandler(async (req, res) => {
    const { email, name, password, roleIds } = req.body;

    // Create user with optional role assignment
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password, // Note: In production, hash this password!
            roles: roleIds ? {
                create: roleIds.map(roleId => ({
                    role: { connect: { id: roleId } }
                }))
            } : undefined
        },
        include: {
            roles: {
                include: { role: true }
            }
        }
    });

    res.status(201).json(user);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
export const getUserById = asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: parseInt(req.params.id) },
        include: {
            posts: true,
            roles: {
                include: { role: true }
            }
        }
    });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json(user);
});
