import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        // _id: String , no need, Id field is automatically added by mongoDB
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true, // for eficient search based on username
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, //cloudinary URL
            required: true,
        },
        coverImage: {
            type: String, //cloudinary URL
        },
        blogs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Blog',
            },
        ],
        password: {
            type: String,
            required: [true, 'Password is required'], // second element in array is the message to be passed to frontend
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true } //when true, document automatically gets two fields: createdAt and updatedAt
);

export const User = mongoose.model('User', userSchema);
