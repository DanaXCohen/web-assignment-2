import mongoose, { Schema, Document } from "mongoose";

interface IComment extends Document {
    postId: string;
    content?: string;
    author: string;
    createdAt: Date
}

const CommentSchema: Schema = new Schema({
    postId: {
        type: String,
        required: true,
    },
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true,
    },
});

const Comments = mongoose.model<IComment>("Comment", CommentSchema);
export default Comments;
