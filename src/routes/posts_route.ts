import express from "express";
const router = express.Router();

import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
} from "../controllers/posts_controller";
import {isAuthorized} from "../middleware/auth";

router.get("/", isAuthorized, getAllPosts);

router.get("/:id", isAuthorized, getPostById);

router.post("/", isAuthorized, createPost);

router.put("/:id", isAuthorized, updatePost);

export default router;
