import React from "react";
import { icons } from "utils";
const { MdEmail } = icons;
const Footer = () => {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center bg-main md:p-3">
        <div className="w-main flex items-center justify-between py-[25px]">
          <div className="w-[50%] flex flex-col">
            <h3 className="text-[20px] text-white">SIGN UP TO NEWSLETTER</h3>
            <span className="text-[13px] text-white opacity-60">
              Subscribe now and receive weekly newsletter
            </span>
          </div>
          <div className="w-[50%] flex">
            <input
              type="email"
              placeholder="Email address"
              className="p-4 pr-0 rounded-l-full w-full outline-none border-none bg-[#F04646] text-gray-100 placeholder:text-sm placeholder:text-gray-100 placeholder:opacity-60"
            />
            <div className="w-[56px] h-[56px]  bg-[#F04646] rounded-r-full flex items-center">
              <MdEmail size={20} color="white" />
            </div>
          </div>
        </div>
      </div>
      <div className="py-[50px] bg-gray-800 w-full flex items-center justify-center text-white text-[13px] md:p-3 ">
        <div className="w-main flex md:flex-col">
          <div className="flex-2 flex flex-col gap-2 ">
            <h3 className="mb-[20px] text-[15px] font-semibold border-l-2 border-main pl-[15px]">
              ABOUT US
            </h3>
            <span>
              <span>Adress: </span>
              <span className="opacity-70">
                474 Ontario St Toronto, ON M4X 1M7 Canada
              </span>
            </span>
            <span>
              <span> Phone: </span>
              <span className="opacity-70">(+1234)56789xxx</span>
            </span>
            <span>
              <span>Mail: </span>
              <span className="opacity-70">nguyendoquangminh222@gmail.com</span>
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="my-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              INFOMATION
            </h3>
            <span className="opacity-70">Typography</span>
            <span className="opacity-70">Gallery</span>
            <span className="opacity-70">Store Location</span>
            <span className="opacity-70">Today's Deals</span>
            <span className="opacity-70">Contact</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="my-[20px] text-[15px] font-semibold border-l-2 border-main pl-[15px]">
              WHO WE ARE
            </h3>
            <span className="opacity-70">Help</span>
            <span className="opacity-70">Free Shipping</span>
            <span className="opacity-70">FAQs</span>
            <span className="opacity-70">Return & Exchange</span>
            <span className="opacity-70">Testimonials</span>
          </div>
          <div className="flex-1">
            <h3 className="my-[20px] text-[15px] font-semibold border-l-2 border-main pl-[15px]">
              #DIGITALWORLDSTORE
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
