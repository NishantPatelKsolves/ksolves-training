import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
        coverimage: {
            type: String, //cloudinary URL
        },
        blogs: [
            {
                type: mongoose.Schema.Types.ObjectId,
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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); //if the paswword is not modified don't hash it in that case; first time the password is not modified so below code runs.
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

userSchema.methods.generateAccessToken = function () {
    //short lived access token
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.JWT_ACCES_TOKEN_SECRET,
        process.env.JWT_ACCESS_TOKEN_EXPIRY
    );
};

userSchema.methods.generateRefreshToken = function () {
    //short lived access token
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        process.env.JWT_REFRESH_TOKEN_EXPIRY
    );
};

export const User = mongoose.model('User', userSchema);
