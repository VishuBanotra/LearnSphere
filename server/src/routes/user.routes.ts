import express from "express";

// Middlewares
import { authMiddleware } from "../middleware/authMiddleware";
import { instructorRoleMiddleware } from "../middleware/role";
import { upload } from "../middleware/multer";

// User Controller
import { userInfo } from "../controller/auth/userAuth.controller";
import { login } from "../controller/auth/userAuth.controller";
import { signup } from "../controller/auth/userAuth.controller";

// Admin Controller
import {
  uploadingVideo,
  newCourse,
  getCourses,
  publish,
} from "../controller/instructor/instructor.controller";

const router = express.Router();

// Auth Routes
router.route("/user").get(authMiddleware, userInfo);
router.route("/login").post(login);
router.route("/signup").post(signup);

// Intructor Routes
router
  .route("/instructor/courses/:page/:limit")
  .get(authMiddleware, instructorRoleMiddleware, getCourses);
router
  .route("/add/course")
  .post(
    authMiddleware,
    instructorRoleMiddleware,
    upload.single("thumbNail"),
    newCourse
  );
router
  .route("/add/video/:courseId")
  .post(
    authMiddleware,
    instructorRoleMiddleware,
    upload.single("video"),
    uploadingVideo
  );
router
  .route("/publish/:courseId")
  .patch(authMiddleware, instructorRoleMiddleware, publish);

export { router as userRoute };
