import mongoose, { Schema } from 'mongoose';
const likeSchema = new mongoose.Schema(
    {
        likedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        blog: {
            type: Schema.Types.ObjectId,
            ref: 'Blog',
        },
    },
    { timestamps: true }
);

export const Like = new mongoose.model('Like', likeSchema);
