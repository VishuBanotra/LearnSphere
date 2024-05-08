import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

import { Document, Model, Schema } from "mongoose";

interface UserType extends Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  generateHash: (password: string) => any;
  validatePassword: (password: string) => boolean;
}

const userSchema: Schema<UserType> = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please enter your name."],
      trim: true,
    },
    username: {
      type: String,
      required: true,
      minlength: [5, "Username should not be less than 5 characters."],
      maxlength: [50, "Username should not be more than 50 characters."],
      trim: true,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please enter a valid E-Mail."],
      required: true,
      minlength: [8, "Username should not be less than 8 characters."],
      maxlength: [100, "Username should not be more than 100 characters."],
      trim: true,
    },
    password: {
      type: "String",
      required: true,
      minlength: [8, "Password should not be less than 8 Characters."],
      maxlength: [100, "Password should not be more than 100 characters."],
      trim: true,
    },

    role: {
      type: String,
      enum: ["user", "instructor"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Hashing Passsword
userSchema.methods.generateHash = async function (password: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};

// Validating Password
userSchema.methods.validatePassword = async function (password: string) {
  try {
    const validatedPassword = await bcrypt.compare(password, this.password);
    return validatedPassword;
  } catch (error) {
    throw error;
  }
};

const User: Model<UserType> = mongoose.model("User", userSchema);

export default User;
