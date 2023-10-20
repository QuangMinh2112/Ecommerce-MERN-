import React from "react";
// import Slider from "react-slick";
import { images } from "utils/BannerImg";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Navigation, Pagination } from "swiper";
const Banner = () => {
  // setting slider
  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };
  return (
    <div className="w-full">
      {/* <Slider {...settings}>
        {images.map((item) => (
          <LazyLoadImage
            src={item.src}
            alt={item.src}
            key={item.id}
            className="w-full h-[463px]"
          />
        ))}
      </Slider> */}
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            <LazyLoadImage
              src={item.src}
              alt={item.src}
              className="w-full h-[463px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
