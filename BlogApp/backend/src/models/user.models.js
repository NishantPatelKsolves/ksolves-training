import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

userSchema.pre('save', async function (params) {
    if (!this.modified('password')) return next(); //if the paswword is not modified don't hash it in that case; first time the password is not modified so below code runs.
    this.password = bcrypt.hash(this.password, 10); //hash 10 rounds
    next();
});

/**
 * checks if password matches tge one stored in DB
 * @param password : the clear text password by user
 * - bcrypt automatically figures out hashing algo and number of rounds, etc,so no need to specify when matching passwords
 * @returns boolean, whether password matches or fails
 */
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);
