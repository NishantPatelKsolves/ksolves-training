import StrdApiResponse from '../utils/strdApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const healthCheckController = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new StrdApiResponse(200, 'OK', 'Health Check Passed'));
});

export default healthCheckController;
