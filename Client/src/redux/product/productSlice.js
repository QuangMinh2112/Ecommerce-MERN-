import { createSlice } from "@reduxjs/toolkit";
import { getNewProduct } from "./asyncAction";

const productSlice = createSlice({
  name: "app",
  initialState: {
    newProducts: null,
    isLoading: false,
    errorMessage: "",
  },
  reducers: {
    logout() {},
  },
  extraReducers: (builder) => {
    builder.addCase(getNewProduct.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getNewProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newProducts = action.payload;
    });
    builder.addCase(getNewProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload?.message;
    });
  },
});
// export const {} = productSlice.actions;

export default productSlice.reducer;
