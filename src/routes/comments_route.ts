import express from "express";
const router = express.Router();

import {
    getAllComments,
    getCommentsByPostId,
    addComment,
    updateComment,
    deleteComment,
} from "../controllers/comments_controller";
import {isAuthorized} from "../middleware/auth";

router.get("/", isAuthorized, async (req, res, next) => {
    try {
        await getAllComments(req, res);
    } catch (err) {
        next(err);
    }
});

router.get("/:postId", isAuthorized, async (req, res, next) => {
    try {
        await getCommentsByPostId(req, res);
    } catch (err) {
        next(err);
    }
});

router.post("/", isAuthorized, async (req, res, next) => {
    try {
        await addComment(req, res);
    } catch (err) {
        next(err);
    }
});

router.put("/:id", isAuthorized, async (req, res, next) => {
    try {
        await updateComment(req, res);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", isAuthorized, async (req, res, next) => {
    try {
        await deleteComment(req, res);
    } catch (err) {
        next(err);
    }
});

export default router;
