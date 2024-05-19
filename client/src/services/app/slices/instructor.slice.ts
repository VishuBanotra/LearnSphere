import { createSlice } from "@reduxjs/toolkit";
import { createCourse, fetchedCourses } from "../actions/instructor.action";

interface InitialState {
  loading: boolean;
  message?: null | string;
  courses?: null | [];
}

const initialState: InitialState = {
  loading: false,
  message: null,
  courses: null,
};

export const courseSlice = createSlice({
  name: "Course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCourse.pending, (state) => {
      state.loading = true;
      state.message = null;
      state.courses = null;
    });
    builder.addCase(createCourse.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.courses = null;
    });
    builder.addCase(createCourse.rejected, (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.courses = null;
    });

    builder.addCase(fetchedCourses.pending, (state) => {
      state.loading = true;
      state.message = null;
      state.courses = null;
    });
    builder.addCase(fetchedCourses.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.message = payload.messages;
      state.courses = payload.courses;
    });
    builder.addCase(fetchedCourses.rejected, (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.courses = null;
    });
  },
});

export default courseSlice.reducer;
