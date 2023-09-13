import { BreadCrumb } from "components";
import React from "react";

const Blog = () => {
  return (
    <div className="w-full">
      <header className="bg-[#f7f7f7] mt-[-20px] p-[15px] flex items-center justify-center">
        <div className="w-main">
          <h3 className="font-semibold text-[18px] mb-[10px]">Title</h3>
          <BreadCrumb
            category="Bolg"
            // title={
            //   data?.variants?.find((el) => el.sku === variant)?.title ||
            //   data?.title
            // }
          />
        </div>
      </header>
      <div className="w-full xl:w-main m-auto">Data</div>
    </div>
  );
};

export default Blog;
