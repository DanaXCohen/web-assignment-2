import express from "express";
const router = express.Router();

import {
    getAllComments,
    getCommentsByPostId,
    addComment,
    updateComment,
    deleteComment,
} from "../controllers/comments_controller";

router.get("/", async (req, res, next) => {
    try {
        await getAllComments(req, res);
    } catch (err) {
        next(err);
    }
});

router.get("/:postId", async (req, res, next) => {
    try {
        await getCommentsByPostId(req, res);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        await addComment(req, res);
    } catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        await updateComment(req, res);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        await deleteComment(req, res);
    } catch (err) {
        next(err);
    }
});

export default router;
