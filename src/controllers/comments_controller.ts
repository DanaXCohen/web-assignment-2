import {Request, Response} from "express";
import Comment from "../models/comments_model";
import Posts from "../models/posts_model"
import { StatusCodes } from "http-status-codes";

export const addComment = async (req: Request, res: Response): Promise<Response> => {
    const { postId, content } = req.body;

    try {
        // Check if the postId exists
        const post = await Posts.findById(postId);
        if (!post) {
            return res.status(StatusCodes.NOT_FOUND).send({ error: "Post not found" });
        }

        // Create the comment
        const comment = new Comment({ postId, content });
        await comment.save();

        return res.status(StatusCodes.CREATED).send(comment);
    } catch (error: any) {
        if (error.name === "ValidationError") {
            return res.status(StatusCodes.BAD_REQUEST).send({ error: "Validation error", details: error.message });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Server error", details: error.message });
        }
    }
};

export const getAllComments = async (req: Request, res: Response): Promise<Response> => {
    try {
        const comments = await Comment.find();
        return res.send(comments);
    } catch (error: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Server error", details: error.message });
    }
};
export const getCommentsByPostId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        return res.send(comments);
    } catch (error: any) {
        if (error.name === "ValidationError") {
            return res.status(StatusCodes.BAD_REQUEST).send({ error: "Validation error", details: error.message });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Server error", details: error.message });
        }
    }
};
export const updateComment = async (req: Request, res: Response): Promise<Response> => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!comment) {
            return res.status(StatusCodes.NOT_FOUND).send("Comment not found");
        }
        return res.send(comment);
    } catch (error: any) {
        if (error.name === "ValidationError") {
            return res.status(StatusCodes.BAD_REQUEST).send({ error: "Validation error", details: error.message });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Server error", details: error.message });
        }
    }
};
export const deleteComment = async (req: Request, res: Response): Promise<Response> => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        return res.send({ message: "Comment deleted" });
    } catch (error: any) {
        if (error.name === "ValidationError") {
            return res.status(StatusCodes.BAD_REQUEST).send({ error: "Validation error", details: error.message });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Server error", details: error.message });
        }
    }
};
export default {
    addComment,
    getAllComments,
    getCommentsByPostId,
    updateComment,
    deleteComment,
};
