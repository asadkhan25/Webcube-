import prisma from '../config/database.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all roles with users
// @route   GET /api/roles
// @access  Public
export const getAllRoles = asyncHandler(async (req, res) => {
    const roles = await prisma.role.findMany({
        include: {
            users: {
                include: { user: true }
            }
        }
    });
    res.json(roles);
});

// @desc    Create a new role
// @route   POST /api/roles
// @access  Public
export const createRole = asyncHandler(async (req, res) => {
    const { roleName, description } = req.body;

    const role = await prisma.role.create({
        data: { roleName, description }
    });

    res.status(201).json(role);
});

// @desc    Get role by ID
// @route   GET /api/roles/:id
// @access  Public
export const getRoleById = asyncHandler(async (req, res) => {
    const role = await prisma.role.findUnique({
        where: { id: parseInt(req.params.id) },
        include: {
            users: {
                include: { user: true }
            }
        }
    });

    if (!role) {
        res.status(404);
        throw new Error('Role not found');
    }

    res.json(role);
});

// @desc    Delete a role
// @route   DELETE /api/roles/:id
// @access  Public
export const deleteRole = asyncHandler(async (req, res) => {
    await prisma.role.delete({
        where: { id: parseInt(req.params.id) }
    });

    res.json({ message: 'Role deleted successfully' });
});
