import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "utils/helper";
import Paypal from "components/Common/Paypal";
import { InputForm, withBaseLogic } from "components";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Congrate from "components/Common/Congrate";
import { getCurrentUser } from "redux/user/userAction";

const Checkout = ({ dispatch, navigate }) => {
  const { currentCart, current } = useSelector((state) => state.user);
  console.log(currentCart);
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const address = watch("address");
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    setValue("address", current?.address);
  }, [current?.address]);
  useEffect(() => {
    if (isSuccess) {
      dispatch(getCurrentUser());
    }
  }, [isSuccess]);
  return (
    <div className="w-full">
      {isSuccess && <Congrate />}
      <div className="border-b">
        <div className="w-main m-auto flex py-5 ">
          <h1
            className="font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Digital World
          </h1>
        </div>
      </div>
      <div className="w-main m-auto">
        <div className="w-full flex relative  h-screen">
          <div className="w-1/2 border-r border-gray-300 p-5 flex flex-col gap-10 overflow-y-auto">
            <InputForm
              label="Your address"
              id="address"
              register={register}
              errors={errors}
              validate={{
                required: "Please, enter your address before paying !",
              }}
              placeholder="Your address..."
              styles="text-sm"
              fullWidth
            />
            <Paypal
              payload={{
                products: currentCart,
                total: Math.round(
                  currentCart?.reduce(
                    (acc, cur) => acc + cur.price * cur.quantity,
                    0
                  ) / 23500
                ),
                address,
              }}
              setIsSuccess={setIsSuccess}
              amount={Math.round(
                currentCart?.reduce(
                  (acc, cur) => acc + cur.price * cur.quantity,
                  0
                ) / 23500
              )}
            />
          </div>
          <div className="w-1/2 p-5 fixed right-0">
            {currentCart?.map((item) => (
              <div className="flex justify-between items-center pb-3">
                <span className="border rounded-md w-[64px] h-[64px] relative">
                  <img
                    src={item?.thumbnail}
                    className="w-full h-full object-contain"
                    alt="images"
                  />
                  <span className="absolute top-[-12px] right-[-11px] text-white bg-gray-500 px-[10px] rounded-full flex items-center">
                    {item?.quantity}
                  </span>
                </span>
                <span className="flex flex-col">
                  <span className="text-sm text-gray-500">{item?.title}</span>
                  <span className="text-sm text-gray-500">{item?.color}</span>
                </span>
                <span>{`${formatPrice(item?.price)} VND`}</span>
              </div>
            ))}

            <div className="flex flex-col py-10 gap-4">
              <span className="flex justify-between">
                <span className="font-bold">Shipping:</span>
                <span>0 VND</span>
              </span>
              <span className="flex justify-between">
                <span className="font-bold">Estimated taxes:</span>
                <span>0 VND</span>
              </span>
              <span className="flex justify-between">
                <span className="font-bold">Total:</span>
                <span>
                  {" "}
                  {`${formatPrice(
                    currentCart?.reduce(
                      (acc, current) => acc + current.price * current.quantity,
                      0
                    )
                  )} VND`}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBaseLogic(Checkout);
