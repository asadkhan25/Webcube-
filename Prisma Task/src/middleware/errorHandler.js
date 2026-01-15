// Global error handling middleware
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    let errors = null;

    // Prisma Error Handling
    if (err.code) {
        switch (err.code) {
            // Unique constraint violation
            case 'P2002':
                statusCode = 409; // Conflict
                const field = err.meta?.target?.[0] || 'field';
                message = `A user with this ${field} already exists`;
                errors = {
                    field: field,
                    value: 'already exists'
                };
                break;

            // Record not found
            case 'P2025':
                statusCode = 404;
                message = 'Record not found';
                break;

            // Foreign key constraint failed
            case 'P2003':
                statusCode = 400;
                message = 'Invalid reference: Related record does not exist';
                break;

            // Required field missing
            case 'P2011':
                statusCode = 400;
                message = 'Required field is missing';
                break;

            // Invalid data type
            case 'P2006':
                statusCode = 400;
                message = 'Invalid data provided';
                break;

            default:
                // Generic Prisma error
                if (err.code.startsWith('P')) {
                    statusCode = 400;
                    message = 'Database operation failed';
                }
        }
    }

    // Validation errors
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation failed';
        errors = Object.values(err.errors).map(e => e.message);
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    // Development vs Production error response
    const errorResponse = {
        success: false,
        message,
        ...(errors && { errors }),
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack,
            error: err,
            prismaCode: err.code
        })
    };

    console.error('Error:', {
        message: err.message,
        code: err.code,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });

    res.status(statusCode).json(errorResponse);
};

export default errorHandler;
