import clsx from "clsx";
import React, { memo } from "react";

const SelectQuantity = ({
  valueQuantity,
  handleQuantity,
  handleChangeQuantity,
  isHideTextQuantity,
  hideMargin,
}) => {
  return (
    <div className="flex items-center">
      <label
        htmlFor="quantity"
        className={clsx("mr-3 font-semibold", hideMargin && "mr-0")}
      >
        {!isHideTextQuantity && "Quantity"}
      </label>
      <button
        className="w-[35px] h-[35px] outline-none bg-none border hover:bg-[#ececec]"
        onClick={() => handleChangeQuantity("minus")}
      >
        -
      </button>
      <input
        type="text"
        className="w-10 text-center h-[35px] border  outline-none text-black"
        value={valueQuantity}
        onChange={(e) => handleQuantity(e.target.value)}
      />
      <button
        className="w-[35px] h-[35px] outline-none bg-none border hover:bg-[#ececec]"
        onClick={() => handleChangeQuantity("plus")}
      >
        +
      </button>
    </div>
  );
};

export default memo(SelectQuantity);
