import SelectQuantity from "components/Selects/SelectQuantity";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { formatPrice } from "utils/helper";

const OrderItem = ({ el, handleChangeQuantities, defaultQuantity = 1 }) => {
  const [valueQuantity, setValueQuantity] = useState(() => defaultQuantity);
  const handleQuantity = (number) => {
    if (!Number(number) || Number(number) < 1) {
      return;
    } else {
      setValueQuantity(number);
    }
  };

  const handleChangeQuantity = (flag) => {
    if (flag === "minus" && valueQuantity <= 1) return;
    if (flag === "minus") setValueQuantity((prev) => prev - 1);
    if (flag === "plus") setValueQuantity((prev) => prev + 1);
  };

  useEffect(() => {
    handleChangeQuantities &&
      handleChangeQuantities(el?.product?._id, valueQuantity, el?.color);
  }, [valueQuantity]);

  return (
    <div className="grid grid-cols-10 place-items-center w-full justify-between border-b p-5 border-[#ccc]">
      <NavLink
        to={`/${el?.product?.category?.toLowerCase()}/${el?.product?._id}/${
          el?.title
        }`}
        key={el._id}
        className="w-full col-span-6 md:col-span-4"
      >
        <img
          src={el?.thumbnail}
          alt="images_product"
          className="w-[200px] h-[200px] cursor-pointer rounded-lg"
        />
      </NavLink>

      <div className="w-full col-span-2 md:col-span-3">
        <SelectQuantity
          valueQuantity={valueQuantity}
          handleQuantity={handleQuantity}
          handleChangeQuantity={handleChangeQuantity}
          isHideTextQuantity
        />
      </div>
      <div className="w-full col-span-2 md:col-span-3">
        <span className="text-[20px]">{`${formatPrice(
          el?.price * valueQuantity
        )} VND`}</span>
      </div>
    </div>
  );
};

export default OrderItem;
