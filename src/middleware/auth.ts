import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user_model';

export const isAuthorized = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        res.status(403).json({ error: "Authorization header not found!" });
        return;
    }
    const token = authHeaders.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        const user = await User.findOne({_id:decodedToken.userId});
        if (!user) {
            res.status(403).json({ error: "Not Authorized!" });
            return;
        }
        req.body = Object.assign(req.body, {userId: decodedToken.userId})
        next();
    } catch (err) {
        res.status(403).json({ error: "Not Authorized!" });
        return;
    }
};
