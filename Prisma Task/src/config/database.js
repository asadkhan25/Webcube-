import { PrismaClient } from '@prisma/client';

// Enhanced Prisma Client configuration with logging and error handling
const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
    errorFormat: 'pretty',
});

// Log queries in development mode
if (process.env.NODE_ENV !== 'production') {
    prisma.$on('query', (e) => {
        console.log('Query: ' + e.query);
        console.log('Duration: ' + e.duration + 'ms');
    });
}

// Log errors
prisma.$on('error', (e) => {
    console.error('Prisma Error:', e);
});

// Log info
prisma.$on('info', (e) => {
    console.log('Prisma Info:', e.message);
});

// Log warnings
prisma.$on('warn', (e) => {
    console.warn('Prisma Warning:', e.message);
});

// Test database connection on initialization
prisma.$connect()
    .then(() => {
        console.log('✅ Database connected successfully');
    })
    .catch((error) => {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1);
    });

export default prisma;
