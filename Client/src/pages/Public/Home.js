import React, { useEffect, useState } from "react";
import {
  Banner,
  BestSeller,
  Blog,
  CustomSlider,
  DealDaily,
  FeatureProduct,
  HotCollection,
  Sidebar,
} from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useSelector } from "react-redux";
var screenWidth;

const Home = () => {
  const { newProducts } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.app);
  const { blogs } = useSelector((state) => state.blog);
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [smScreen, setSmScreen] = useState(false);
  const [mdScreen, setMdScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      screenWidth = window.innerWidth;
      if (screenWidth > 560 && screenWidth <= 650) {
        setMdScreen(true);
      } else {
        setMdScreen(false);
      }

      if (screenWidth <= 560) {
        setSmScreen(true);
      } else {
        setSmScreen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  return (
    <>
      <div className="w-full xl:w-main flex md:flex md:flex-col md:justify-center">
        <div className="flex flex-col gap-5 w-[25%] flex-auto md:w-full md:pb-[25px] md:order-2">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 pl-5 md:pl-0 w-[75%] flex-auto md:w-full">
          <Banner />

          <BestSeller toShowSm={smScreen && 1} toShowMd={mdScreen && 2} />
        </div>
      </div>
      <div className="my-8">
        <FeatureProduct />
      </div>
      <div className="my-8 w-full xl:w-main ">
        <h3 className="text-[20px] font-semibold py-[15x] border-b-2 border-main">
          NEW ARRIVALS
        </h3>
        <div className="mt-4 mx-[-10px] pt-4">
          <CustomSlider
            products={newProducts}
            toShow={smScreen ? 1 : mdScreen ? 2 : 3}
          />
        </div>
      </div>
      <div className="my-8 w-full xl:w-main md:p-[25px]">
        <h3 className="text-[20px] font-semibold py-[15x] border-b-2 border-main">
          HOT COLLECTIONS
        </h3>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {categories
            ?.filter((item) => item.brand.length > 0)
            ?.map((item) => (
              <HotCollection key={item._id} data={item} />
            ))}
        </div>
      </div>
      <div className="my-8 w-full xl:w-main md:p-[25px]">
        <h3 className="text-[20px] font-semibold py-[15x] border-b-2 border-main">
          BLOG POSTS
        </h3>
        <div className="flex flex-wrap justify-between gap-4 mt-4">
          <Swiper
            spaceBetween={50}
            slidesPerView={smScreen ? 1 : mdScreen ? 2 : 3}
          >
            {blogs?.map((item) => (
              <SwiperSlide>
                <Blog key={item._id} data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Home;
