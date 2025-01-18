import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        age: number;
        password: string;
        refreshToken: string | null;
        createdAt?: Date;
        updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
    {
            username: { type: String, required: true, unique: true },
            email: { type: String, required: true, unique: true },
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            age: {
                    type: Number,
                    required: true,
                    min: [18, 'You should be at least 18 years old!'],
                    max: [120, 'Please enter a valid age!']
            },
            password: { type: String, required: true, select: false },
            refreshToken: { type: String, select: false },
    },
    { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
