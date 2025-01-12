import { getUserProfile, createUser, updateUser, deleteUser } from '../controllers/user_controller';
import { isAuthorized } from '../middleware/auth';
import express from "express";

const router = express.Router();
router.get('/profile', isAuthorized, getUserProfile);
router.post('/', createUser);
router.put('/:id', isAuthorized, updateUser);
router.delete('/:id', isAuthorized, deleteUser);
export default router;
