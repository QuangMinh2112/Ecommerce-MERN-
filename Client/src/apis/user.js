import axios from "../axios";

export const apiRegisterUser = (data) =>
  axios({
    url: "/user/register",
    method: "POST",
    data,
  });

export const apiFinalRegister = (token) =>
  axios({
    url: "/user/finalRegister/" + token,
    method: "PUT",
  });

export const apiLoginUser = (data) =>
  axios({
    url: "/user/login",
    method: "POST",
    data,
  });

export const apiForgotPassword = (data) =>
  axios({
    url: "/user/forgotPassword",
    method: "POST",
    data,
  });

export const apiResetPassword = (data) =>
  axios({
    url: "/user/resetPassword",
    method: "PUT",
    data,
  });

export const apiGetCurrentUser = () =>
  axios({
    url: "/user/current",
    method: "GET",
  });

export const apiGetAllUser = (params) =>
  axios({
    url: "/user",
    method: "GET",
    params,
  });

export const apiUpdateUserByAdmin = (data, userId) =>
  axios({
    url: "/user/" + userId,
    method: "PUT",
    data,
  });
export const apiDeleteUser = (userId) =>
  axios({
    url: "/user/" + userId,
    method: "DELETE",
  });

export const apiUpdateCurrentUser = (data) =>
  axios({
    url: "/user/current",
    method: "PUT",
    data,
  });

export const apiAddCart = (data) =>
  axios({
    url: `/user/cart`,
    method: "PUT",
    data,
  });
export const apiRemoveProductInCart = (pid, color) =>
  axios({
    url: `/user/remove-cart/${pid}/${color}`,
    method: "DELETE",
  });
