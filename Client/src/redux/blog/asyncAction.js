import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";
export const getBlog = createAsyncThunk(
  "blog/getAll",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetBlogs();
    if (!response.success) rejectWithValue(response);
    return response.message;
  }
);
