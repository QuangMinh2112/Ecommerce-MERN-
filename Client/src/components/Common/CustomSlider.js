import React, { memo } from "react";
import Slider from "react-slick";
import Product from "../Products";

const CustomSlider = ({ products, isActive, isHideNew, toShow }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: toShow ? toShow : 3,
    slidesToScroll: 1,
  };
  return (
    <div className="">
      {products && (
        <Slider className="custom_slider" {...settings}>
          {products?.map((item) => (
            <Product
              key={item._id}
              data={item}
              isNew={isActive === 0 ? false : true}
              isHideNew={isHideNew}
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default memo(CustomSlider);
