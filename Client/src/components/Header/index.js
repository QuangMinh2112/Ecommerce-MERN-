import React, { useEffect, useState } from "react";
import logo from "assets/logo.png";
import { icons } from "utils";
import { Link } from "react-router-dom";
import { path } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/user/userSlice";
import clsx from "clsx";
import { showCart, showSideBar } from "redux/app/appSlice";

const { HiPhone, HiMail, GiShoppingBag, FaUserCircle, BiMenu, BsFillCartFill } =
  icons;

const Header = () => {
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);
  const { isShowModal } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleShowSideBar = () => {
    dispatch(showSideBar({ signal: true }));
  };

  useEffect(() => {
    const handleClickoutOption = (e) => {
      const profile = document.getElementById("profile");
      //contains -> kiem tra xem chua profile hay khong -> tra ve true false
      if (!profile?.contains(e.target)) setIsShowOption(false);
    };

    document.addEventListener("click", handleClickoutOption);

    return () => {
      document.removeEventListener("click", handleClickoutOption);
    };
  });
  return (
    <div className="w-full xl:w-main h-[110px] flex py-[35px] items-center justify-between">
      {/* Mobile */}
      <div
        className="cursor-pointer hidden md:block"
        onClick={handleShowSideBar}
      >
        <BiMenu size={35} />
      </div>

      <Link to={`${path.HOME}`}>
        <img src={logo} alt="Logo" className="w-[234px] object-contain" />
      </Link>

      <div className="flex">
        {/* contact */}
        <div className="flex flex-col border-r items-center px-5 md:hidden">
          <span className="flex text-[13px] items-center gap-3">
            <HiPhone size={12} color="red" />
            <span className="text-black font-semibold">(+1800) 000 8808</span>
          </span>

          <span className="text-xs">Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        {/* end contact */}
        {/* mail info */}
        <div className="flex flex-col border-r items-center px-5 md:hidden">
          <span className="flex text-[13px] items-center gap-2">
            <HiMail size={17} color="red" />
            <span className="text-black font-semibold">
              SUPPORT@TADATHEMES.COM
            </span>
          </span>

          <span className="text-xs">Online Support 24/7</span>
        </div>
        {/* end mail info */}
        {/* cart */}

        {/* end cart */}
        {/* profile */}
        {current && (
          <>
            <div
              className={`flex items-center gap-2 md:hidden ${
                current && "border-r"
              } justify-center px-5 cursor-pointer`}
              onClick={() => dispatch(showCart({ signal: true }))}
            >
              <GiShoppingBag size={20} color="red" />
              <span className="">{`${current?.cart.length || 0} item`}</span>
            </div>
            <div
              className={clsx(
                "flex items-center gap-2 border-r-0 justify-center pl-5 cursor-pointer md:hidden",
                isShowModal ? "" : "relative"
              )}
              onClick={() => setIsShowOption((prev) => !prev)}
              id="profile"
            >
              <FaUserCircle size={23} color="red" />
              <span className="">Porfile</span>
              {isShowOption && (
                <div
                  className="absolute top-full left-[16px] z-10 bg-gray-100 min-w-[200px] border py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link
                    className="p-2 w-full block hover:bg-sky-100"
                    to={`/${path.MEMBER}/${path.PERSONAL}`}
                  >
                    Personal
                  </Link>
                  {+current?.role === 2 && (
                    <Link
                      className="p-2 w-full block hover:bg-sky-100"
                      to={`/${path.ADMIN}/${path.MANAGE_USER}`}
                    >
                      Admin
                    </Link>
                  )}
                  <span
                    className="p-2 w-full block hover:bg-sky-100"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
            <div
              className="cursor-pointer hidden md:block"
              onClick={() => dispatch(showCart({ signal: true }))}
            >
              <BsFillCartFill size={25} />
            </div>
          </>
        )}
        {/* end profile */}
      </div>
    </div>
  );
};

export default Header;
