import {
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/users_controller";
import express from "express";

const router = express.Router();
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
