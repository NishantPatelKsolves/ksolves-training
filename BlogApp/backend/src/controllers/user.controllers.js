import asyncHandler from '../utils/asyncHandler.js';
import StrdApiErrorResponse from '../utils/strdApiErrorResponse.js';
import { User } from '../models/user.models.js';
import {
    uploadOnCloudinaryResult,
    deleteFromCloudinary,
} from '../utils/cloudinary.js';
import StrdApiResponse from '../utils/strdApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body;

    //field validations
    if (
        [fullname, email, username, password].some(
            (field) => field?.trim() === ''
        )
    ) {
        throw new StrdApiErrorResponse(400, 'All fields are required');
    } else console.log('4 text fields validation pass');

    //check if user already exist in our DB
    const existingUser = await User.findOne({
        $or: [{ username }, { email }], //search based on username and email, if anyone matches, user is declared 'existing'
    });
    if (existingUser) {
        throw new StrdApiErrorResponse(
            409,
            'User with username/email already exist'
        );
    } else console.log('Not and existing users');

    //handle images: avatar and coverimage
    console.log(req.files);

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverimageLocalPath = req.files?.coverimage?.[0]?.path;

    /**
     * refactored below logic
     */
    // if (!avatarLocalPath) {
    //     throw new StrdApiErrorResponse(400, 'Avatar file missing');
    // }
    // //send avatar to cloudinary
    // const avatarCloudinary = await uploadOnCloudinaryResult(avatarLocalPath);
    // // if (!coverimageLocalPath) {
    // //     throw new StrdApiErrorResponse(400, 'Avatar file missing');
    // // } //since coverimage is not compulsory this validation not necessary here
    // let coverimageCloudinary = '';
    // if (coverimageLocalPath) {
    //     coverimageCloudinary =
    //         await uploadOnCloudinaryResult(coverimageLocalPath);
    // }

    let avatarCloudinary;
    try {
        avatarCloudinary = await uploadOnCloudinaryResult(avatarLocalPath);
        console.log('Uploaded avatar on cloudinary', avatarCloudinary);
    } catch (error) {
        console.log('Error uploading avatar', error);
        throw new StrdApiErrorResponse(500, 'Failed to upload avatar');
    }

    let coverimageCloudinary;
    try {
        coverimageCloudinary =
            await uploadOnCloudinaryResult(coverimageLocalPath);
        console.log('Uploaded cover image on cloudinary', coverimageCloudinary);
    } catch (error) {
        console.log('Error uploading cover image', error);
        throw new StrdApiErrorResponse(500, 'Failed to upload cover image');
    }

    try {
        //let's create new user
        const user = await User.create({
            fullname: fullname,
            avatar: avatarCloudinary.url,
            coverimage: coverimageCloudinary.url || '',
            email: email,
            password: password,
            username: username.toLowerCase(),
        });

        //once user is created in DB, reconfirm by querying it with it's id
        const createdUser = await User.findById(user._id).select(
            '-password -refreshToken'
        ); // second query gives reliable response
        // .select() - removes fields from quering;don't send encrypted password and token to user

        if (!createdUser) {
            throw new StrdApiErrorResponse(
                500,
                'Something went wrong while registering user'
            );
        }

        return res
            .status(201)
            .json(
                new StrdApiResponse(
                    201,
                    createdUser,
                    'User registered successfully'
                )
            );
    } catch (error) {
        console.log('User creation failed hua', error);
        if (avatarCloudinary) {
            await deleteFromCloudinary(avatarCloudinary.public_id);
        }
        if (coverimageCloudinary) {
            await deleteFromCloudinary(coverimageCloudinary.public_id);
        }
        throw new StrdApiErrorResponse(
            500,
            'Something went wrong while registering user and images deleted from Cloudinary'
        );
    }
});

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await new User.findById(userId);
        //check if user existes
        if (!user) {
            throw new StrdApiErrorResponse(401, 'User does not exist');
            console.log(`User with id: ${userId} does not exist`);
            return null;
        }

        //generate tokens
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        //set refresh token on User in db
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.log('Error generating token', error);
        throw new StrdApiErrorResponse(
            500,
            'Something went wrong while generating access and refresh token'
        );
    }
};

const loginUser = asyncHandler(async (req, res) => {
    //1. get data from body
    const { email, username, password } = req.body;
    //validate data
    if (!email || !username || !password) {
        throw new StrdApiErrorResponse(
            400,
            'Email, Username and Password are mandatory'
        );
    }

    //2. check if user exist, based on id and username
    const user = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (!user) {
        console.log(`User with this email/username does not exist`);
        throw new StrdApiErrorResponse(
            401,
            'User with this email/username does not exist'
        );
    }

    //3. once 'user' found -> validate password
    const validPassword = await user.isPasswordCorrect(password);
    if (!validPassword) {
        console.log('Password authentication failed');
        throw new StrdApiErrorResponse(400, 'Incorrect password');
    }

    //4. if password is correct generate tokens(both)
    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(user._id); // this generates the tokens and also saves them on DB

    //5. for fail-safe approach: new db query to fetch the user with updated credentials
    const loggedInUser = await User.findById(user._id).select(
        '-password -refreshToken' //exclude fetching password and refreshToken
    );
    if (!loggedInUser) {
        console.log('Something went wrong with accessing logged in user');
        throw new StrdApiErrorResponse(
            500,
            'Something went wrong with accessing logged in user'
        );
    }

    //6. send logged-in user details  to frontend
    const options = {
        httpOnly: true, //make cookie not-modifyable at client end
        secure: process.env.NODE_ENV === 'production', // makes 'true' when env is prod, else 'false' is okay for testing
    };

    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new StrdApiErrorResponse(
                200,
                loggedInUser,
                'User loggen in successfully'
            )
        );
});

export { registerUser };
