import { Request, Response } from 'express';
import User from '../models/user_model';

const getUserProfile = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.body.user?.id;
        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
export { getUserProfile, createUser, deleteUser, updateUser };
