import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "./userAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: null,
    isLogin: false,
    token: null,
    isLoading: false,
    mes: "",
    currentCart: [],
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.token = null;
      state.current = null;
    },
    clearMessage: (state) => {
      state.mes = "";
    },
    updateCart: (state, action) => {
      const { color, pid, qty } = action.payload;
      state.currentCart = JSON.parse(JSON.stringify(state.currentCart))?.map(
        (item) => {
          if (item?.color === color && item?.product?._id === pid) {
            return { ...item, quantity: qty };
          } else return item;
        }
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
      state.isLogin = true;
      state.currentCart = action.payload.cart;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
      state.current = null;
      state.token = null;
      state.mes = "Your login session has expired. Please login again !";
    });
  },
});
export const { login, logout, clearMessage, updateCart } = userSlice.actions;

export default userSlice.reducer;
