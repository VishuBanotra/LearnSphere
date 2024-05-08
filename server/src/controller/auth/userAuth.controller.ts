import jwt from "jsonwebtoken";
import User from "../../model/profile.model";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { AuthValSchema, LoginSchema } from "../../validation/validation";

export const userInfo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers["userId"];
    const user = await User.findById(userId);
    if (user) {
      return res.json({
        sucess: true,
        id: user._id,
        role: user.role,
      });
    } else {
      return res.status(400).json({ message: "User not found." });
    }
  }
);

// SignUp Controller
export const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const parsedInput = AuthValSchema.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(411).json({ message: parsedInput.error });
    }

    const existingUser = await User.findOne({
      $or: [
        { username: parsedInput.data.username },
        { email: parsedInput.data.email },
      ],
    });

    if (existingUser) {
      res.json({ success: false, message: "User already registered." });
    } else {
      const newUser = new User({
        fullname: parsedInput.data.fullname,
        username: parsedInput.data.username,
        email: parsedInput.data.email,
        role: parsedInput.data.role,
      });
      newUser.password = await newUser.generateHash(parsedInput.data.password);
      await newUser.save();

      res.status(200).json({
        success: true,
        message: "User Created Successfully.",
      });
    }
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const parsedInput = LoginSchema.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(411).json({ message: parsedInput.error });
    }

    const user = await User.findOne({
      $or: [
        { email: parsedInput.data.UnameOrEmail },
        { username: parsedInput.data.UnameOrEmail },
      ],
    });

    if (user) {
      const isValidPassword = await user.validatePassword(
        parsedInput.data.password
      );

      if (isValidPassword) {
        const token = jwt.sign(
          {
            userId: user._id,
          },
          String(process.env.JWT_SECRET),
          { expiresIn: "1h" }
        );
        res.status(201).json({
          success: true,
          message: "User Logged in Successfully",
          token,
        });
      } else {
        res.json({ success: false, message: "Invalid Password." });
      }
    } else {
      res.json({ success: false, message: "Username or Email is incorrect." });
    }
  }
);
