import { DEBUG_MODE } from "../config/Index.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";

const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let data = {
        message: 'Internal server error',
        ...(DEBUG_MODE === 'true' && { originalError: err.message })
    };
    
    if (err instanceof CustomErrorHandler) {
        statusCode = err.status;
        data = {
            message: err.message
        };
    }

    if (err.code && err.code === 11000) {
        statusCode = 400;
        data = {
            message: `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
        }
    }

    if (err.name === 'CastError') {
        data = {
            message: `No item found with id : ${err.value}`
        };
        statusCode = 404;
    }

    return res.status(statusCode).json(data);
};

export default errorHandler;
