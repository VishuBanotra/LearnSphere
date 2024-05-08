import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { connection } from "../../../config/config";

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
      return rejectWithValue(error.message);
    }
  }
);
