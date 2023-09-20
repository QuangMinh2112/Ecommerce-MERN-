import React from "react";
import payment from "assets/images/payment.svg";
import { useSelector } from "react-redux";
import { formatPrice } from "utils/helper";
import Paypal from "components/Common/Paypal";

const Checkout = () => {
  const { currentCart } = useSelector((state) => state.user);
  return (
    <div className="p-8 w-full max-h-screen grid grid-cols-10">
      <div className="w-full flex items-center justify-center col-span-4">
        <img src={payment} alt="Payment" className="object-contain" />
      </div>
      <div className="flex flex-col w-full gap-6 col-span-6 items-center">
        <h2 className="text-2xl font-bold">Checkout your order</h2>
        <table className="table-auto w-full border-[#ccc]">
          <thead>
            <tr className="border bg-gray-200">
              <th className="text-center p-2">Product</th>
              <th className="text-center p-2">Quantity</th>
              <th className="text-center p-2">Color</th>
              <th className="text-center p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {currentCart?.map((item) => (
              <tr>
                <td className="text-center p-2">{item?.title}</td>
                <td className="text-center p-2">{item?.quantity}</td>
                <td className="text-center p-2">{item?.color}</td>
                <td className="text-center p-2">{`${formatPrice(
                  item?.price
                )} VND`}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>input addrses</div>
        <div className="w-full flex flex-col justify-center">
          <Paypal amount={120} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
