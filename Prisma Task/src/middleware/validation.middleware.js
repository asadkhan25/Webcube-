/**
 * Validation Middleware
 * Provides reusable validation functions for user input
 */

/**
 * Validate email format
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate password strength
 * At least 6 characters (basic validation)
 */
export const validatePassword = (password) => {
    return password && password.length >= 6;
};

/**
 * Validate user ID parameter
 */
export const validateUserId = (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id <= 0) {
        res.status(400);
        throw new Error('Invalid user ID');
    }

    next();
};

/**
 * Validate user creation data
 */
export const validateUserCreate = (req, res, next) => {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
        res.status(400);
        throw new Error('Email and password are required');
    }

    // Validate email format
    if (!validateEmail(email)) {
        res.status(400);
        throw new Error('Invalid email format');
    }

    // Validate password strength
    if (!validatePassword(password)) {
        res.status(400);
        throw new Error('Password must be at least 6 characters long');
    }

    next();
};

/**
 * Validate user update data
 */
export const validateUserUpdate = (req, res, next) => {
    const { email, password } = req.body;

    // If email is provided, validate format
    if (email && !validateEmail(email)) {
        res.status(400);
        throw new Error('Invalid email format');
    }

    // If password is provided, validate strength
    if (password && !validatePassword(password)) {
        res.status(400);
        throw new Error('Password must be at least 6 characters long');
    }

    next();
};
