import mongoose, { Document, Schema, Model } from "mongoose";

interface VideoType extends Document {
  title: string;
  description: string;
  video: string;
}

const videoSchema: Schema<VideoType> = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  video: {
    type: String,
    required: true,
  },
});

export const Video: Model<VideoType> = mongoose.model("Video", videoSchema);
