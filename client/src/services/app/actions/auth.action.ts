import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { connection } from "../../../config/config";

interface SignIn {
  UnameOrEmail: string;
  password: string;
}

interface SignUP {
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export const loadUser = createAsyncThunk(
  "loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${connection}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const signUp = createAsyncThunk(
  "/signup",
  async (credentials: SignUP, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${connection}/signup`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "/signin",
  async (credentials: SignIn, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${connection}/login`, credentials, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.data;
      const token = data.token;
      localStorage.setItem("token", token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
