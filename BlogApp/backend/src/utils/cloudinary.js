import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

/**
 * function that acceps a file path and this file goes to cloudinary
 */

// Configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

// Upload an image
const uploadOnCloudinaryResult = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });
        console.log('File success fully uploaded on cloudinary');
        console.log('File path: ', uploadResponse.url);
        console.log('More info on upload', uploadResponse);
        //once file is uploaded, delete it from server
        fs.unlinkSync(localFilePath);
        return uploadResponse;
    } catch (error) {
        console.log('Error uploading file to Cloudinary:', error);
        fs.unlinkSync(localFilePath);
        return null;
    }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        const deletionResult = await cloudinary.uploader.destroy(publicId);
        console.log('File deleted from cloudinary. Public ID:', publicId);
    } catch (error) {
        console.log('Error deleting from cloudinary', error);
        return null;
    }
};

export { uploadOnCloudinaryResult, deleteFromCloudinary };
