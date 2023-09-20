import axios from "../axios";
export const apiCreateBlog = (data) =>
  axios({
    url: "/blog/create",
    method: "POST",
    data,
  });

export const apiGetBlogs = () =>
  axios({
    url: "/blog",
    method: "GET",
  });

export const apiGetDetailBlog = (blogId) =>
  axios({
    url: `/blog/details/${blogId}`,
    method: "GET",
  });
