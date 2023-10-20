import { apiGetBlogs } from "apis";
import { BreadCrumb } from "components";
import DOMPurify from "dompurify";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { icons } from "utils";
import { checkLengthBiographyArtists } from "utils/helper";
const { HiOutlineArrowNarrowRight, BsDot } = icons;
const Blog = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const fetchAllBlog = async () => {
    const res = await apiGetBlogs();
    setData(res.message);
  };
  useEffect(() => {
    fetchAllBlog();
  }, []);
  return (
    <div className="w-full">
      <header className="bg-[#f7f7f7] mt-[-20px] p-[15px] flex items-center justify-center">
        <div className="w-main">
          <h3 className="font-semibold text-[18px] mb-[10px]">
            {location?.pathname
              ?.split("/")
              [location?.pathname?.split("/").length - 1].split("-")
              .join(" ")
              .toUpperCase()}
          </h3>
          <BreadCrumb category="Blogs" title="Test" />
        </div>
      </header>
      <div className="w-full xl:w-main m-auto my-10 flex">
        <div className="w-3/4 flex flex-col gap-5">
          {data?.map((item) => (
            <div key={item._id} className="flex gap-3 mb-5 h-[280px] pr-3">
              <div className="w-1/2">
                <img
                  src={item?.images}
                  alt="Images"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-1/2 flex flex-col gap-3">
                <NavLink
                  to={`${item?._id}/${item?.title
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  className="font-bold hover:text-main cursor-pointer"
                >
                  {item?.title}
                </NavLink>
                <p className="flex gap-3 items-center">
                  <span className="text-gray-500">By {item?.author}</span>
                  <span className="flex items-center text-gray-500">
                    <BsDot /> {moment(item?.createdAt).format("MMM Do YY")}
                  </span>
                  <span className="flex items-center text-gray-500">
                    {" "}
                    <BsDot />
                    {`${item?.numberViews} views`}
                  </span>
                </p>
                <div className="text-gray-600">
                  <p
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        checkLengthBiographyArtists(item?.description, 200)
                      ),
                    }}
                  ></p>
                </div>
                <span className="flex items-center gap-2 text-main hover:text-black cursor-pointer">
                  <HiOutlineArrowNarrowRight />
                  Read more
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/4">
          <div className="w-full border border-main mb-5">
            <h6 className="bg-main text-white py-[14px] px-[15px] mb-0 font-bold">
              RECENT ARTICLES
            </h6>
            <ul className="p-5 flex flex-col gap-5">
              <li className="flex flex-col gap-2">
                <div className="font-medium text-sm text-gray-700">
                  The standard Lorem Ipsum passage, used since the 1500s
                </div>
              </li>
              <li className="flex flex-col gap-2">
                <div className="font-medium text-sm text-gray-700">
                  {" "}
                  Section 1.10.33 of de Finibus Bonorum et Malorum, written by
                  Cicero in 45 BC
                </div>
              </li>
              <li className="flex flex-col gap-2">
                <div className="font-medium text-sm text-gray-700">
                  {" "}
                  Quisque porta felis est ut malesuada lorem dignissim
                </div>
              </li>
            </ul>
          </div>
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/9069783_orig_400x_5a30224e-9dc2-442a-85fd-0b09a896a89a_400x.jpg?v=1613168570"
            alt="Images"
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
