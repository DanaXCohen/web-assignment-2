import express from "express";
const router = express.Router();

import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts_controller";
import {
  addComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
  deleteAllCommentsByPostId,
} from "../controllers/comments_controller";

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

router.get("/:postId/comment", getAllComments);
router.get("/:postId/comments/:commentId", getCommentById);
router.post("/:postId/comment", addComment);
router.put("/:postId/comments/:commentId", updateComment);
router.delete("/:postId/comments/:commentId", deleteComment);
router.delete("/:postId/comment", deleteAllCommentsByPostId);

export default router;
