import React from "react";
import Slider from "react-slick";
import { images } from "utils/BannerImg";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Banner = () => {
  // setting slider
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-full">
      <Slider {...settings}>
        {images.map((item) => (
          <LazyLoadImage
            src={item.src}
            alt={item.src}
            key={item.id}
            className="w-full h-[463px]"
          />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
