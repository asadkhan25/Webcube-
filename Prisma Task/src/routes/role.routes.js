import express from 'express';
import {
    getAllRoles,
    createRole,
    getRoleById,
    deleteRole
} from '../controllers/role.controller.js';

const router = express.Router();

router.route('/')
    .get(getAllRoles)
    .post(createRole);

router.route('/:id')
    .get(getRoleById)
    .delete(deleteRole);

export default router;
