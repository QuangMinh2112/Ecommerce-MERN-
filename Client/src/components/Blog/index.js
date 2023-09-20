import moment from "moment";
import React from "react";
import { NavLink } from "react-router-dom";
import { path } from "utils";
import { checkLengthBiographyArtists } from "utils/helper";

const Blog = ({ data }) => {
  return (
    <div className="flex flex-col gap-3 w-full md:w-full">
      <div className="">
        <NavLink
          to={`${path.BLOGS}/${data?._id}/${data?.title
            .replace(/\s+/g, "-")
            .toLowerCase()}`}
        >
          <img src={data?.images} alt="Images" className="w-full" />
        </NavLink>
      </div>
      <div className="flex flex-col gap-3 justify-center items-center text-center">
        <NavLink
          to={`${path.BLOGS}/${data?._id}/${data?.title
            .replace(/\s+/g, "-")
            .toLowerCase()}`}
          className="font-bold hover:text-main cursor-pointer"
        >
          {data?.title?.toUpperCase()}
        </NavLink>
        <span className="text-sm text-gray-500">
          {moment(data?.createdAt).format("MMMM Do YYYY")}
        </span>
        <p className="text-sm text-gray-500 leading-6">
          {checkLengthBiographyArtists(data?.description, 148)}
        </p>
      </div>
    </div>
  );
};

export default Blog;
