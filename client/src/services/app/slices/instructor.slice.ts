import { createSlice } from "@reduxjs/toolkit";
import { createCourse } from "../actions/instructor.action";

interface InitialState {
  loading: boolean;
  error: null | string;
  message?: null | string;
  course?: null | {};
}

const initialState: InitialState = {
  loading: false,
  error: null,
  message: null,
  course: null,
};

export const courseSlice = createSlice({
  name: "Course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCourse.pending, (state) => {
      state.loading = true;
      state.message = null;
      state.course = null;
    });
    builder.addCase(createCourse.fulfilled, (state, { payload }) => {
      state.loading = payload.message.loading;
      state.message = payload.message;
      state.course = payload.course;
    });
    builder.addCase(createCourse.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    });
  },
});

export default courseSlice.reducer;
