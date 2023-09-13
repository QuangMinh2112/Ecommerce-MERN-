import React, { useEffect, useState } from "react";
import { icons } from "../../utils";
import { apiGetProducts } from "../../apis/product";
import { formatCoundown, formatPrice, ratingStar } from "../../utils/helper";
import { NavLink } from "react-router-dom";

import moment from "moment";
import Countdown from "./Countdown";
const { AiFillStar, BiMenu } = icons;

var interval;
const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [exprimeTime, setExprimeTime] = useState(false);
  const fetchDealDaily = async () => {
    const res = await apiGetProducts({
      limit: 1,
      page: Math.round(Math.random() * 10),
      totalRatings: 5,
    });
    if (res.success) {
      setDealDaily(res?.products[0]);

      const today = `${moment().format("MM/DD/YYYY")} 5:00:00`;
      const seconds =
        new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;
      const number = formatCoundown(seconds);
      setHours(number.h);
      setMinutes(number.m);
      setSeconds(number.s);
    } else {
      setHours(0);
      setMinutes(59);
      setSeconds(59);
    }
  };

  useEffect(() => {
    interval && clearInterval(interval);

    fetchDealDaily();
  }, [exprimeTime]);
  useEffect(() => {
    interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else {
        if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(60);
        } else {
          if (hours > 0) {
            setHours((prev) => prev - 1);
            setMinutes(60);
            setSeconds(60);
          } else {
            setExprimeTime(!exprimeTime);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hours, minutes, seconds, exprimeTime]);
  return (
    <div className="w-full flex flex-col flex-auto border mt-[10px]">
      <div className="flex items-center justify-between p-4 w-full">
        <span className="flex-1 flex justify-center">
          <AiFillStar size={20} color="#DD1111" />
        </span>
        <span className="flex-8 font-semibold uppercase text-[20px] flex justify-center">
          DealDaily
        </span>
        <span className="flex-1"></span>
      </div>
      <div className="w-full flex flex-col items-center px-4 pt-8 gap-2">
        <img
          src={
            dealDaily?.thumb ||
            "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
          }
          alt="dealDaily"
          className="w-full object-contain"
        />
        <span className="text-center">{dealDaily?.title}</span>
        <span className="flex h-4">
          {ratingStar(dealDaily?.totalRatings, 20)}
        </span>
        <span className="flex h-4">{`${formatPrice(
          Number(dealDaily?.price)
        )} VND`}</span>
      </div>
      <div className="p-4 mt-4">
        <div className="flex gap-2 justify-center">
          <Countdown unit={"Hours"} number={hours} />
          <Countdown unit={"Minutes"} number={minutes} />
          <Countdown unit={"Seconds"} number={seconds} />
        </div>
        <NavLink
          to={`/${dealDaily?.category}/${dealDaily?._id}/${dealDaily?.title}`}
          className="w-full flex items-center  mt-4 py-[10px] justify-center bg-red-500 text-white gap-3 hover:bg-black hover:duration-500"
        >
          <span>
            <BiMenu size={20} />
          </span>
          OPTIONS
        </NavLink>
      </div>
    </div>
  );
};

export default DealDaily;
