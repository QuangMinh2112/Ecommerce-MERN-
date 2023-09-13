import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";

const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: null,
    isLoading: false,
    isShowModal: false,
    modalChildren: null,
    isShowCart: false,
    isShowSideBar: false,
  },
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.modalChildren = action.payload.modalChildren;
    },
    showCart: (state, action) => {
      state.isShowCart = action.payload.signal ? true : false;
    },
    showSideBar: (state, action) => {
      state.isShowSideBar = action.payload.signal ? true : false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getCategories.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(actions.getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload?.message;
    });
  },
});
export const { showModal, showCart, showSideBar } = appSlice.actions;

export default appSlice.reducer;
