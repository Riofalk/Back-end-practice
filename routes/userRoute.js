import userModel from '../models/userModel.js';
import express from 'express';
import { createUser, getAllUsers, getUserById, deleteUserById, updateUser, deleteAllUsers } from '../controller/userController.js';

const router = express.Router();

router.post('/create', createUser)

router.get("/get", getAllUsers)

router.get("/get/:id", getUserById)

router.delete("/delete/:id", deleteUserById)

router.put("/put/:id", updateUser)

router.delete("/deleteAllUsers", deleteAllUsers)

export default router;