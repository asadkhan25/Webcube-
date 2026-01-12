import express from 'express';
import userRoutes from './user.routes.js';
import roleRoutes from './role.routes.js';
import postRoutes from './post.routes.js';
import userRoleRoutes from './userRole.routes.js';

const router = express.Router();

// Mount routes
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoleRoutes); // User-role assignment routes

export default router;
