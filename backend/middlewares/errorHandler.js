class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(999).json({ message: "An error was caught by the error middleware." });
};
module.exports = {
    AppError,
    errorHandler
  };