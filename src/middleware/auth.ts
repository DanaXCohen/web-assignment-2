import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        throw new Error('No token provided');
    }

    try {
        const decoded = jwt.verify(token, 'accessTokenSecret');
        req.body.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
}
