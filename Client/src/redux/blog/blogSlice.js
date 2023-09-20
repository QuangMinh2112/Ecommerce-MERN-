import { createSlice } from "@reduxjs/toolkit";
import { getBlog } from "./asyncAction";

const blogSlice = createSlice({
  name: "app",
  initialState: {
    blogs: null,
    isLoading: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlog.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.blogs = action.payload;
    });
    builder.addCase(getBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload?.message;
    });
  },
});
// export const {} = productSlice.actions;

export default blogSlice.reducer;
