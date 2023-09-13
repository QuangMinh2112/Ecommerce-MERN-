import React from "react";
import { NavLink } from "react-router-dom";
import { formatPrice, ratingStar } from "utils/helper";

const Productcard = ({ id, title, price, category, image, totalRatings }) => {
  return (
    <div className="w-1/3 md:w-full flex-auto px-[10px] mb-5 ml-[-20px]">
      <div className="w-full flex border">
        <NavLink
          className="w-[120px] p-4"
          to={`/${category?.toLowerCase()}/${id}/${title}`}
        >
          <img src={image} alt="image" className="w-full object-contain" />
        </NavLink>
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full">
          <NavLink
            to={`${category?.toLowerCase()}/${id}/${title}`}
            className="text-sm capitalize cursor-pointer hover:text-main"
          >
            {title.toLowerCase()}
          </NavLink>
          <span className="flex h-4">
            {ratingStar(totalRatings, 14)?.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </span>
          <span className="text-xs">{`${formatPrice(price)} VNĐ`}</span>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
