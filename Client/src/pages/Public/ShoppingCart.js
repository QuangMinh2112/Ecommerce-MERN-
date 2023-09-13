import { BreadCrumb, Button, withBaseLogic } from "components";
import OrderItem from "components/Products/OrderItem";
import { useSelector } from "react-redux";
import { updateCart } from "redux/user/userSlice";
import { icons } from "utils";
import { formatPrice } from "utils/helper";
const { BsArrowRight } = icons;
const ShoppingCart = ({ dispatch }) => {
  const { currentCart } = useSelector((state) => state.user);

  const handleChangeQuantities = (pid, qty, color) => {
    dispatch(updateCart({ pid, qty, color }));
  };
  return (
    <div className="w-full">
      <header className="bg-[#f7f7f7] mt-[-20px] p-[15px] flex items-center justify-center">
        <div className="w-main">
          <h3 className="font-semibold text-[18px] mb-[10px]">YOUR CART</h3>
          <BreadCrumb title="Your cart" category="Your cart" />
        </div>
      </header>
      <div className="w-full xl:w-main flex flex-col m-auto items-center my-7 justify-center border">
        <div className="w-full py-[15px] px-[20px] border-b border-[#ccc]">
          <div className="grid grid-cols-10 place-items-center w-full justify-between">
            <h2 className="w-full col-span-6 md:col-span-4"> </h2>
            <h2 className="w-full col-span-2 md:col-span-3 font-bold text-[17px] uppercase">
              Quantity
            </h2>
            <h2 className="w-full col-span-2 md:col-span-3 font-bold text-[17px] uppercase">
              Total
            </h2>
          </div>
        </div>
        {currentCart?.map((el) => (
          <OrderItem
            el={el}
            handleChangeQuantities={handleChangeQuantities}
            defaultQuantity={el?.quantity}
          />
        ))}
        <div className="grid grid-cols-10 place-items-center w-full flex-col gap-5 justify-between border-b p-5 border-[#ccc]">
          <span className="col-span-6"></span>
          <span className="col-span-2">Subtotal</span>
          <div className="col-span-2 font-bold text-[17px]">
            {`${formatPrice(
              currentCart?.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue?.price * currentValue?.quantity,
                0
              )
            )} VND`}
          </div>
          <p className="italic w-full grid justify-end col-span-10">
            Shipping, taxes, and discounts calculated at checkout.
          </p>
          <div className="w-full grid justify-end col-span-10">
            <Button style="w-[200px] flex items-center  mt-4 py-[10px] justify-center bg-red-500 text-white gap-3 hover:bg-black hover:duration-500">
              CHECKOUT
              <BsArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBaseLogic(ShoppingCart);
