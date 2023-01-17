"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    const message = error.message || "encounter error";
    const status = error.statusCode || 500;
    console.log("Error Message", message);
    res
        .status(status)
        .json({ message: message, error: "Error message", errorStatus: status });
    next();
};
exports.default = errorHandler;
