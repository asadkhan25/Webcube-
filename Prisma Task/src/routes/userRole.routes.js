import express from 'express';
import {
    assignRolesToUser,
    getUserRoles,
    removeRoleFromUser
} from '../controllers/userRole.controller.js';

const router = express.Router();

// User-Role assignment routes
router.route('/:id/roles')
    .post(assignRolesToUser)
    .get(getUserRoles);

router.route('/:id/roles/:roleId')
    .delete(removeRoleFromUser);

export default router;
