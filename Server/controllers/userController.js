import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import User from "../models/userSchema.js";
import Workspace from "../models/workspaceSchema.js";
import { JwtService } from "../services/JwtService.js";

export const register = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .error(new Error("Passwords must match")),
  });

  const { error } = schema.validate({ name, email, password, confirmPassword });

  if (error) {
    return next(CustomErrorHandler.validationError(error.message));
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(
        CustomErrorHandler.alreadyExist("Email is already registered")
      );
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const workspaceName = `${name}'s Workspace`;
    const newWorkspace = new Workspace({
      name: workspaceName,
      ownerId: newUser._id,
    });
    await newWorkspace.save();

    newUser.workspaceId = newWorkspace._id;
    await newUser.save();

    res.status(201).json({
      message: "User register successfully.",
      user: newUser,
    });
  } catch (error) {
    return next(error);
  }
};


export const login = async (req, res, next)=>{
    const {email, password} = req.body;

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    })

    const { error } = schema.validate({ email, password });
    if (error) {
      return next(CustomErrorHandler.validationError(error.message));
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(CustomErrorHandler.wrongCredentials("Invalid email."));
        }

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return next(CustomErrorHandler.unAuthorized("Invalid password."));
        }

        JwtService(user, 'login successfully', 200, res);
    } catch (error) {
        next(error);
    }
}

export const update = async (req, res, next) => {
  const { name, email, password } = req.body;
  const userId = req.user._id;

  const schema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
  });

  const { error } = schema.validate({ name, email, password });
  if (error) {
    return next(CustomErrorHandler.validationError(error.message));
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(CustomErrorHandler.notFound("User not found"));
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated",
      user,
    });
  } catch (error) {
    next(error);
  }
};


export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: "logged out",
    });
  } catch (error) {
    next(error);
  }
};