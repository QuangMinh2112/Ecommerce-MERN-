import { apiRemoveProductInCart } from "apis";
import withBaseLogic from "components/Hoc/withBaseLogic";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { showCart } from "redux/app/appSlice";
import { getCurrentUser } from "redux/user/userAction";
import { icons, path } from "utils";
import { capitalize_Words, formatPrice } from "utils/helper";
const { BsTrash } = icons;
const Cart = ({ dispatch, navigate }) => {
  const { currentCart } = useSelector((state) => state.user);
  const updateCart = async ({ pid, color }) => {
    const res = await apiRemoveProductInCart(pid, color);
    if (res) {
      toast.success(res.message);
      dispatch(getCurrentUser());
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div
      className="w-[400px] bg-[#1c1d1d] max-h-screen overflow-y-auto text-white p-6 grid grid-rows-10 animate-slide-left"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="py-5 border-b border-gray-600 flex justify-between items-center font-bold row-span-1 text-2xl">
        Your cart
      </h2>
      <div className="row-span-6 h-full overflow-y-auto">
        {currentCart?.map((item) => (
          <div
            key={item._id}
            className="w-full flex gap-3 items-center py-5 border-b border-gray-600"
          >
            <div className="w-[25%] h-[77px] cursor-pointer">
              <img
                src={item?.thumbnail}
                alt="thumb"
                className="w-full h-full"
                onClick={() => {
                  dispatch(showCart({ signal: false }));
                  navigate(
                    `/${item?.product?.category?.toLowerCase()}/${
                      item?.product?._id
                    }/${item?.product?.title}`
                  );
                }}
              />
            </div>
            <div className="flex flex-col w-[75%] text-sm gap-1 leading-[1.15rem]">
              <h2
                className="cursor-pointer hover:text-red-400"
                onClick={() => {
                  dispatch(showCart({ signal: false }));
                  navigate(
                    `/${item?.product?.category?.toLowerCase()}/${
                      item?.product?._id
                    }/${item?.product?.title}`
                  );
                }}
              >
                {capitalize_Words(item?.title)}
              </h2>

              <span>{item?.color}</span>
              <span>Quantity: {item?.quantity}</span>

              <div className="flex text-sm gap-2 font-medium justify-between">
                <span>{`${formatPrice(item?.price)} VND`}</span>
                <div
                  title="Delete"
                  className="cursor-pointer hover:text-red-500"
                  onClick={() =>
                    updateCart({ pid: item?.product?._id, color: item?.color })
                  }
                >
                  <BsTrash size="20" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row-span-3 h-full">
        <div className="flex items-center justify-between">
          <p className="font-bold">SUBTOTAL</p>
          <span>
            {`${formatPrice(
              currentCart?.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue?.price * currentValue?.quantity,
                0
              )
            )} VND`}
          </span>
        </div>
        <p className="italic font-normal opacity-70 text-sm p-3">
          Shipping, taxes, and discounts calculated at checkout.
        </p>
        <div>
          <button
            onClick={() => {
              navigate(`${path.CART}`);
              dispatch(showCart({ isShowCart: false }));
            }}
            className="w-full flex items-center  mt-4 py-[10px] justify-center bg-red-500 text-white gap-3 hover:bg-black hover:duration-500"
          >
            SHOPPPING CART
          </button>
          <button className="w-full flex items-center  mt-4 py-[10px] justify-center bg-red-500 text-white gap-3 hover:bg-black hover:duration-500">
            <span></span>
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default withBaseLogic(memo(Cart));
