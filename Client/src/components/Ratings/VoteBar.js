import React, { useEffect, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
const VoteBar = ({ number, ratingCount, ratingTotal }) => {
  console.log(ratingCount);
  const percentRef = useRef();
  const percent = Math.round((ratingCount * 100) / ratingTotal) || 0;
  useEffect(() => {
    percentRef.current.style.cssText = `right: ${100 - percent}%`;
  }, [percent]);
  return (
    <div className="flex items-center gap-2">
      <div className="flex w-[10%] items-center justify-center gap-1 text-sm">
        <span>{number}</span>
        <AiFillStar color="orange" />
      </div>
      <div className="w-[75%]">
        <div className="w-full relative h-[6px] bg-gray-300 rounded-l-full rounded-r-full">
          <div ref={percentRef} className="absolute inset-0 bg-red-500"></div>
        </div>
      </div>
      <div className="w-[15%] flex justify-end text-xs">{`${
        ratingCount || 0
      } reviews`}</div>
    </div>
  );
};

export default VoteBar;
