import React, { memo } from "react";
import { icons } from "../../utils";
const { IoIosArrowForward } = icons;
const HotCollection = ({ data }) => {
  return (
    <div className="w-[396px] md:w-full">
      <div className="border flex p-4 gap-4 ">
        <img
          src={data?.image}
          alt={data?.title}
          className="w-[144px] h-[129px] object-cover cursor-pointer"
        />
        <div className="h-[168px]">
          <h4 className="font-semibold uppercase mb-2">{data?.title}</h4>
          <ul className="text-sm text-gray-500">
            {data?.brand?.map((item, index) => (
              <span key={index} className="flex gap-1 items-center">
                <IoIosArrowForward />
                <li className="hover:text-main cursor-pointer">{item}</li>
              </span>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(HotCollection);
