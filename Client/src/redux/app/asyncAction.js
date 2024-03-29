import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";
export const getCategories = createAsyncThunk(
  "app/categories",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetCategory();
    if (!response.success) rejectWithValue(response);
    return response.productCategory;
  }
);
