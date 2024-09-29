import mongoose, { Schema } from 'mongoose';
const commentSchema = new mongoose.Schema(
    {
        owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        blog: {
            type: Schema.Types.ObjectId,
            ref: 'Blog',
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

export const Comment = new mongoose.model('Comment', commentSchema);
