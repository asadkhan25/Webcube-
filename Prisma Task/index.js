import app from './src/app.js';
import prisma from './src/config/database.js';

const PORT = process.env.PORT || 3000;

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log('\n🏗️  Professional Folder Structure');
    console.log('📊 API Endpoints:\n');
    console.log('  === Database ===');
    console.log('  GET    / - Test database connection\n');
    console.log('  === Users ===');
    console.log('  GET    /api/users - Get all users (with roles)');
    console.log('  POST   /api/users - Create user (with optional roles)');
    console.log('  GET    /api/users/:id - Get user by ID (with roles)\n');
    console.log('  === Roles ===');
    console.log('  GET    /api/roles - Get all roles');
    console.log('  POST   /api/roles - Create role');
    console.log('  GET    /api/roles/:id - Get role by ID');
    console.log('  DELETE /api/roles/:id - Delete role\n');
    console.log('  === User-Role Assignment ===');
    console.log('  POST   /api/users/:id/roles - Assign roles to user');
    console.log('  GET    /api/users/:id/roles - Get user\'s roles');
    console.log('  DELETE /api/users/:id/roles/:roleId - Remove role from user\n');
    console.log('  === Posts ===');
    console.log('  GET    /api/posts - Get all posts');
    console.log('  POST   /api/posts - Create post');
    console.log('  GET    /api/posts/:id - Get post by ID\n');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n\nShutting down gracefully...');
    await prisma.$disconnect();
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGTERM', async () => {
    console.log('\n\nShutting down gracefully...');
    await prisma.$disconnect();
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
