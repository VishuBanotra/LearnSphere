import { createAsyncThunk } from "@reduxjs/toolkit";
import { connection } from "../../../config/config";
import axios from "axios";

// Fetching Instructor's Uploaded Courses
export const fetchedCourses = createAsyncThunk(
  "/instructor/Courses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${connection}/instructor/courses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = response.data;
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// Creating Course
export const createCourse = createAsyncThunk(
  "/create/course",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${connection}/add/course`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const response = result.data;
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
