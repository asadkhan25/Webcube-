import prisma from '../config/database.js';

/**
 * User Service Layer
 * Handles all database operations related to users
 * Separates business logic from controllers
 */

/**
 * Create a new user
 * @param {Object} data - User data
 * @param {string} data.email - User email (required, unique)
 * @param {string} data.name - User name (optional)
 * @param {string} data.password - User password (required)
 * @param {number[]} data.roleIds - Array of role IDs to assign (optional)
 * @returns {Promise<Object>} Created user with roles
 */
export const createUser = async (data) => {
    const { email, name, password, roleIds } = data;

    // Validate required fields
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    // Create user with optional role assignment
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password, // Note: In production, hash this password using bcrypt!
            roles: roleIds && roleIds.length > 0 ? {
                create: roleIds.map(roleId => ({
                    role: { connect: { id: roleId } }
                }))
            } : undefined
        },
        include: {
            roles: {
                include: { role: true }
            },
            posts: true
        }
    });

    return user;
};

/**
 * Get all users with optional filtering, pagination, and sorting
 * @param {Object} options - Query options
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Items per page (default: 10)
 * @param {string} options.search - Search term for name or email
 * @param {string} options.sortBy - Field to sort by (default: 'createdAt')
 * @param {string} options.sortOrder - Sort order: 'asc' or 'desc' (default: 'desc')
 * @param {boolean} options.includeRoles - Include user roles (default: true)
 * @param {boolean} options.includePosts - Include user posts (default: true)
 * @returns {Promise<Object>} Users array with pagination metadata
 */
export const getAllUsers = async (options = {}) => {
    const {
        page = 1,
        limit = 10,
        search = '',
        sortBy = 'createdAt',
        sortOrder = 'desc',
        includeRoles = true,
        includePosts = true
    } = options;

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Build where clause for search
    const where = search ? {
        OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
        ]
    } : {};

    // Get total count for pagination
    const total = await prisma.user.count({ where });

    // Get users with filters and pagination
    const users = await prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            roles: includeRoles ? {
                include: { role: true }
            } : false,
            posts: includePosts
        }
    });

    return {
        users,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasMore: skip + users.length < total
        }
    };
};

/**
 * Get user by ID
 * @param {number} id - User ID
 * @param {Object} options - Query options
 * @param {boolean} options.includeRoles - Include user roles (default: true)
 * @param {boolean} options.includePosts - Include user posts (default: true)
 * @returns {Promise<Object|null>} User object or null if not found
 */
export const getUserById = async (id, options = {}) => {
    const { includeRoles = true, includePosts = true } = options;

    const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: {
            roles: includeRoles ? {
                include: { role: true }
            } : false,
            posts: includePosts
        }
    });

    return user;
};

/**
 * Get user by email
 * @param {string} email - User email
 * @param {Object} options - Query options
 * @param {boolean} options.includeRoles - Include user roles (default: false)
 * @param {boolean} options.includePosts - Include user posts (default: false)
 * @returns {Promise<Object|null>} User object or null if not found
 */
export const getUserByEmail = async (email, options = {}) => {
    const { includeRoles = false, includePosts = false } = options;

    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            roles: includeRoles ? {
                include: { role: true }
            } : false,
            posts: includePosts
        }
    });

    return user;
};

/**
 * Update user by ID
 * @param {number} id - User ID
 * @param {Object} data - User data to update
 * @returns {Promise<Object>} Updated user
 */
export const updateUser = async (id, data) => {
    const { email, name, password } = data;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { id: parseInt(id) }
    });

    if (!existingUser) {
        throw new Error('User not found');
    }

    // If email is being updated, check for uniqueness
    if (email && email !== existingUser.email) {
        const emailExists = await prisma.user.findUnique({
            where: { email }
        });

        if (emailExists) {
            throw new Error('Email already in use');
        }
    }

    // Update user
    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
            ...(email && { email }),
            ...(name && { name }),
            ...(password && { password }) // Note: Hash password in production!
        },
        include: {
            roles: {
                include: { role: true }
            },
            posts: true
        }
    });

    return updatedUser;
};

/**
 * Delete user by ID
 * @param {number} id - User ID
 * @returns {Promise<Object>} Deleted user
 */
export const deleteUser = async (id) => {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { id: parseInt(id) }
    });

    if (!existingUser) {
        throw new Error('User not found');
    }

    // Delete user (cascade will handle related records)
    const deletedUser = await prisma.user.delete({
        where: { id: parseInt(id) }
    });

    return deletedUser;
};
