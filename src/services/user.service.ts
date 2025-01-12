import User, {IUser} from '../models/user_model';

export const UserService = {

    async getUserById(userId: string) {
        const user: IUser | null = await User.findById(userId);
        return user;
    },

    async getUserByEmail(email: string) {
        const user: IUser | null = await User.findOne({email}).select('+password').exec();
        return user;
    },

    async updateProfile(userId: string, userData: Partial<IUser> & { file: string }) {
        return User.findByIdAndUpdate(userId, {
            profileImage: userData.file,
            userName: userData.userName,
        }, { new: true });
    },

    async getAllUsers() {
        return User.aggregate([
            {
                $lookup: {
                    from: 'chats',
                    localField: '_id',
                    foreignField: 'participants',
                    as: 'chats'
                }
            },
            {
                $addFields: {
                    hasChats: { $gt: [{ $size: '$chats' }, 0] },
                    lastUpdated: { $max: '$chats.lastUpdated' }
                }
            },
            {
                $sort: { lastUpdated: -1 }
            },
            {
                $project: {
                    chats: 0,
                    hasChats: 0,
                    password: 0,
                    refreshToken: 0
                }
            }
        ]);
    }
};
