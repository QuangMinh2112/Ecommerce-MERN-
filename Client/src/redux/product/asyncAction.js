import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";
export const getNewProduct = createAsyncThunk(
  "product/newProducts",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetProducts({ sort: "-createdAt" });
    if (!response.success) rejectWithValue(response);
    return response.products;
  }
);
