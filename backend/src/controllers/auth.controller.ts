import { Response, NextFunction } from "express";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import NotificationService from "../services/notification.service.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

export const signup = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  if (password.length < 6) {
    return next(new AppError("Password must be at least 6 characters", 400));
  }

  const user = await User.findOne({ email });

  if (user) return next(new AppError("Email already exists", 400));

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    const token = generateToken(newUser._id, res);
    await newUser.save();

    NotificationService.sendWelcomeNotification(newUser._id);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
      notificationPreferences: newUser.notificationPreferences,
      token: token,
    });
  } else {
    return next(new AppError("Invalid user data", 400));
  }
});


export const login = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Invalid credentials", 400));
  }
  if (!user.password) {
    return next(new AppError("Invalid credentials", 400));
  }

  const isPasswordCorrect = await bcrypt.compare(password || "", user.password);
  if (!isPasswordCorrect) {
    return next(new AppError("Invalid credentials", 400));
  }

  const token = generateToken(user._id, res);

  res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic,
    notificationPreferences: user.notificationPreferences,
    token: token,
  });
});


export const logout = (req: AuthRequest, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

export const updateProfile = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { profilePic } = req.body;
  const userId = req.user?._id;

  if (!profilePic) {
    return next(new AppError("Profile pic is required", 400));
  }

  const uploadResponse = await cloudinary.uploader.upload(profilePic);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { profilePic: uploadResponse.secure_url },
    { new: true }
  ).select("-password");

  res.status(200).json(updatedUser);
});

export const checkAuth = (req: AuthRequest, res: Response) => {
  res.status(200).json(req.user);
};
