import mongoose, { Schema, Document } from "mongoose";

interface IPost extends Document {
    title: string;
    content?: string;
    userId: string;
    createdAt: Date;
}

const postsSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Posts = mongoose.model<IPost>("Posts", postsSchema);
export default Posts;
