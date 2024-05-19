import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";

import {
  CourseValidation,
  VideoValidation,
} from "../../validation/course.validation";
import { uploadOnCloudinary } from "../../utils/cloudinary";
import Course from "../../model/course.model";
import { Video } from "../../model/video.model";

// Getting All courses
export const getCourses = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const instructorId = req.headers["userId"];
    const courses = await Course.find({ createdBy: instructorId })
      .populate({ path: "createdBy", select: "fullname" })
      .select("title description createdBy price thumbNail videos");

    if (courses) {
      return res.status(200).json({
        success: true,
        messages: "Courses Fetched Successfully.",
        courses,
      });
    } else {
      return res.send(404).json({
        success: false,
        message: "Courses Not Found.",
      });
    }
  }
);

// Publish Course
export const publish = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const isPublished = req.body;
    const courseId = req.params.courseId;

    if (courseId) {
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        isPublished,
        { new: true }
      );

      if (updatedCourse) {
        return res.status(201).json({
          success: true,
          message: "Course updated successfully.",
          updatedCourse,
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Error updating Course." });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Course Not Found." });
    }
  }
);

// Create Course Info
export const newCourse = asyncHandler(async (req: Request, res: Response) => {
  const parsedInputs = CourseValidation.safeParse(req.body);
  if (!parsedInputs.success) {
    return res.status(400).json(parsedInputs.error);
  }

  console.log(req.file);

  const thumbNailLocalPath: string | undefined = req.file?.path;
  if (!thumbNailLocalPath) throw new Error("Thumbnail is Required 1.");

  console.log(thumbNailLocalPath);

  const thumbNail = await uploadOnCloudinary(thumbNailLocalPath);
  if (!thumbNail) throw new Error("Thumbnail is required.");

  console.log(thumbNail);

  const instructorId = req.headers["userId"];

  const createdCourse = await Course.create({
    title: parsedInputs.data.title,
    createdBy: instructorId,
    description: parsedInputs.data.description,
    price: parsedInputs.data.price,
    category: parsedInputs.data.category,
    thumbNail: thumbNail.url,
  });

  if (createdCourse) {
    return res.status(201).json({
      success: true,
      message: "Course Created Successfully",
      course: createdCourse,
    });
  } else {
    return res.json({ success: false, message: "Error Creating Course" });
  }
});

// Uploading Videos
export const uploadingVideo = asyncHandler(async (req, res) => {
  const parsedInput = VideoValidation.safeParse(req.body);

  if (!parsedInput.success) {
    return res.status(400).json(parsedInput.error);
  }

  const videoPath = req.file?.path;
  if (!videoPath) throw new Error("Video path is required.");

  const video = await uploadOnCloudinary(videoPath);
  if (!video) {
    return res.json({ success: false, message: "Error uploading Video." });
  }

  const createdVideo = await Video.create({
    title: parsedInput.data.title,
    description: parsedInput.data.description,
    video: video?.url,
  });

  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);

  if (course) {
    const newArr: object[] = course.videos;
    newArr.push(createdVideo);
    await course.save();
    return res
      .status(201)
      .json({ success: true, message: "Video Uploaded successfully" });
  } else {
    return res
      .status(404)
      .json({ success: false, message: "Course not found." });
  }
});
