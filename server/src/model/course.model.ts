import mongoose, { Document, Schema, Model, Types } from "mongoose";

interface CourseType extends Document {
  title: string;
  description: string;
  createdBy: Schema.Types.ObjectId;
  price: string;
  isPublished: boolean;
  thumbNail: string;
  category: string;
  users: [];
  videos: [];
}

const courseSchema: Schema<CourseType> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    thumbNail: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course: Model<CourseType> = mongoose.model("Course", courseSchema);

export default Course;
