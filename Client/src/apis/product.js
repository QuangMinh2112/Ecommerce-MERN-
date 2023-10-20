import axios from "../axios";
export const apiGetProducts = (params) =>
  axios({
    url: "/product/",
    method: "GET",
    params,
  });

export const apiGetDetailsProduct = (id) =>
  axios({
    url: `/product/${id}`,
    method: "GET",
  });

export const apiRatings = (data) =>
  axios({
    url: `/product/ratings`,
    method: "PUT",
    data,
  });

export const apiCreateProduct = (data) =>
  axios({
    url: `/product/create`,
    method: "POST",
    data,
  });
export const apiUpdateProduct = (data, productId) =>
  axios({
    url: `/product/` + productId,
    method: "PUT",
    data,
  });
export const apiAddVariant = (data, productId) =>
  axios({
    url: `/product/variant/` + productId,
    method: "PUT",
    data,
  });

export const apiCreateOrder = (data) =>
  axios({
    url: `/order/`,
    method: "POST",
    data,
  });
