class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

const errorHandler = (err, req, res, next) => {
    res.status(999).json({
        status: err.status,
        message: "An error was caught by the error middleware: " + err.message
    });
};

module.exports = {
    AppError,
    errorHandler
};