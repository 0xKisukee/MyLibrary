class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode).json({
        status: "ERROR 💥 " + err.statusCode,
        message: "Rrror caught by the middleware: " + err.message
    });
};

module.exports = {
    AppError,
    errorHandler
};