import React, { memo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
const ProductImageSlider = (props) => {
  const [activeThumb, setActiveThumb] = useState();
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{ swiper: activeThumb }}
        className="product-images-slider"
      >
        {props?.images?.map((item, index) => (
          <SwiperSlide key={index} className="border">
            <img
              src={item}
              alt="product images"
              className="h-full object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
        className="product-images-slider-thumbs"
      >
        {props?.images?.map((item, index) => (
          <SwiperSlide className="mt-3" key={index}>
            <div className="product-images-slider-thumbs-wrapper">
              <img src={item} alt="product images" className="p-4" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default memo(ProductImageSlider);
