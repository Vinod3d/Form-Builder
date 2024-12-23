import { JWT_KEY } from "../config/Index.js";
import User from "../models/userSchema.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    const token = req.cookies.token; 

    if (!token) {
        return next(CustomErrorHandler.unAuthorized("You Are Not logged in"));
    }

    try {
        const user = jwt.verify(token, JWT_KEY);
        req.user = await User.findOne({_id: user._id}); 
        next();
    } catch (error) {
        next(error);
    }
};

export default auth;
