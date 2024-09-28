class StrdApiErrorResponse extends Error {
    constructor(
        statusCode,
        message = 'Something went wrong',
        errors = [],
        stack = ''
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
        this.data = null;
        this.success = false;
    }
}

export default StrdApiErrorResponse;
