import { apiGetDetailBlog } from "apis";
import { BreadCrumb } from "components";
import DOMPurify from "dompurify";
import moment from "moment";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { icons } from "utils";
import { capitalize_Words, checkLengthBiographyArtists } from "utils/helper";

const { BiArrowBack, BsDot } = icons;
const DetailBlog = () => {
  const location = useLocation();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const modelQuickViewRef = useRef();
  const fetchGetDetailBlog = async () => {
    const res = await apiGetDetailBlog(id);
    if (res.success) {
      setData(res.message);
    }
  };
  useEffect(() => {
    if (id) {
      fetchGetDetailBlog();
    }
  }, [id]);

  useEffect(() => {
    modelQuickViewRef.current.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="w-full">
      <header
        className="bg-[#f7f7f7] mt-[-20px] p-[15px] flex items-center justify-center"
        ref={modelQuickViewRef}
      >
        <div className="w-main">
          <h3 className="font-semibold text-[18px] mb-[10px]">{data?.title}</h3>
          <BreadCrumb category="" title={data?.title} />
        </div>
      </header>
      <div className="w-full xl:w-main m-auto">
        <p className="flex gap-3 items-center pt-6">
          <span className="text-gray-500">By {data?.author}</span>
          <span className="flex items-center text-gray-500">
            <BsDot /> {moment(data?.createdAt).format("MMM Do YY")}
          </span>
          <span className="flex items-center text-gray-500">
            {" "}
            <BsDot />
            {`${data?.numberViews} views`}
          </span>
        </p>
        <div className="mt-4">
          <img src={data?.images} alt="Images" className="w-full h-[780px]" />
        </div>
        <div className="mt-4">
          <p
            className="text-gray-600"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                checkLengthBiographyArtists(data?.description)
              ),
            }}
          ></p>
        </div>

        <div className="flex justify-end pt-4">
          <span
            onClick={handleGoBack}
            className="flex items-center text-gray-500 gap-3 cursor-pointer hover:text-main"
          >
            <BiArrowBack />
            BACK
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
