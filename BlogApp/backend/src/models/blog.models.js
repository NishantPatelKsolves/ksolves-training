import mongoose, { Schema } from 'mongoose';
const blogSchema = new mongoose.Schema(
    {
        author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

export const Blog = new mongoose.model('Blog', blogSchema);
