import express from "express";
import {
    createUser,
    deleteUser,
    getAllUser,
    getUser,
    updateUser
} from "../controllers/userController.js";

const router = express.Router();

//CRUD ROUTES FOR POSTMAN
router.get("/", getAllUser);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
