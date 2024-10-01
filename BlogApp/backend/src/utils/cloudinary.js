import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

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
const uploadObnCloudinaryResult = async (localFilePath) => {
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
// Optimize delivery by resizing and applying auto-format and auto-quality
const optimizeUrl = cloudinary.url('shoes', {
    fetch_format: 'auto',
    quality: 'auto',
});

console.log(optimizeUrl);

// Transform the image: auto-crop to square aspect_ratio
const autoCropUrl = cloudinary.url('shoes', {
    crop: 'auto',
    gravity: 'auto',
    width: 500,
    height: 500,
});

console.log(autoCropUrl);
