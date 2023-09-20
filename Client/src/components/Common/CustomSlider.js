import React, { memo } from "react";
import Slider from "react-slick";
import Product from "../Products";
import Blog from "components/Blog";

const CustomSlider = ({ products, isActive, blogs, isHideNew, toShow }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: toShow ? toShow : 3,
    slidesToScroll: 1,
  };
  return (
    <>
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
      {/* {blogs && (
        <Slider className="custom_slider_blogs" {...settings}>
          {blogs?.map((item) => (
            <Blog
              key={item._id}
              data={item}
              isNew={isActive === 0 ? false : true}
              isHideNew={isHideNew}
            />
          ))}
        </Slider>
      )} */}
    </>
  );
};

export default memo(CustomSlider);
