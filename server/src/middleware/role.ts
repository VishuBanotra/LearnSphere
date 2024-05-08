import { Request, Response, NextFunction } from "express";
import User from "../model/profile.model";

export const userRoleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers["userId"];

  const user = await User.findById(userId);

  const role = user?.role;

  if (role !== "user") {
    return res.json({ success: false, message: "Not Allowed." });
  } else {
    next();
  }
};

export const instructorRoleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const instructorId = req.headers["userId"];

  const instructor = await User.findById(instructorId);

  const role = instructor?.role;

  if (role !== "instructor") {
    return res.json({ success: false, message: "Not Allowed." });
  } else {
    next();
  }
};
