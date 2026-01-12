import prisma from '../config/database.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Assign role(s) to a user
// @route   POST /api/users/:id/roles
// @access  Public
export const assignRolesToUser = asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id);
    const { roleIds } = req.body;

    if (!Array.isArray(roleIds)) {
        res.status(400);
        throw new Error('roleIds must be an array');
    }

    // Create user-role assignments
    const assignments = await Promise.all(
        roleIds.map(roleId =>
            prisma.userRole.create({
                data: {
                    userId,
                    roleId
                },
                include: {
                    role: true,
                    user: true
                }
            })
        )
    );

    res.status(201).json(assignments);
});

// @desc    Get all roles for a user
// @route   GET /api/users/:id/roles
// @access  Public
export const getUserRoles = asyncHandler(async (req, res) => {
    const userRoles = await prisma.userRole.findMany({
        where: { userId: parseInt(req.params.id) },
        include: { role: true }
    });

    res.json(userRoles);
});

// @desc    Remove a role from a user
// @route   DELETE /api/users/:id/roles/:roleId
// @access  Public
export const removeRoleFromUser = asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id);
    const roleId = parseInt(req.params.roleId);

    await prisma.userRole.delete({
        where: {
            userId_roleId: { userId, roleId }
        }
    });

    res.json({ message: 'Role removed from user successfully' });
});
