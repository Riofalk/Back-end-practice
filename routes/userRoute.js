
import express from 'express';
import { verifySessionToken, verifySessionTokenAdmin } from '../authCheck/authCheck.js';
import { getAllUsers, getUserById, deleteUserById, updateUser, deleteAllUsers, revokeAdmin } from '../controller/userController.js';

const router = express.Router();

router.get("/get", verifySessionTokenAdmin, getAllUsers)

router.get("/get/:id", verifySessionToken, getUserById)

router.delete("/delete/:id", verifySessionToken, deleteUserById)

router.patch("/patch/revokeAdmin/:id", verifySessionTokenAdmin, revokeAdmin)

router.put("/put/:id", verifySessionToken, verifySessionTokenAdmin, updateUser)

router.delete("/deleteAllUsers", verifySessionTokenAdmin,  deleteAllUsers)

export default router;