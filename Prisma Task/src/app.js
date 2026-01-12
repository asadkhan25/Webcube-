import express from 'express';
import prisma from './config/database.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(express.json());

// Test database connection endpoint
app.get('/', async (req, res) => {
    try {
        await prisma.$connect();
        res.json({
            message: 'Hello World! Database connected successfully.',
            status: '✅ PostgreSQL + Prisma ORM is working!',
            architecture: '🏗️ Professional folder structure implemented!'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Database connection failed',
            error: error.message
        });
    }
});

// API Routes
app.use('/api', routes);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
