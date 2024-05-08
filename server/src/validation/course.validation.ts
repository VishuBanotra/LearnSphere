import { z } from "zod";

const CourseValidation = z.object({
  title: z.string().min(10).max(100).trim(),
  description: z.string().min(20).max(150).trim(),
  price: z.string(),
  // thumbNail: z.object({}).optional(),
  category: z.string(),
});

export { CourseValidation };

const VideoValidation = z.object({
  title: z.string().min(10).max(50).trim(),
  description: z.string().min(10).max(100).trim(),
  video: z.string().optional(),
});

export { VideoValidation };
