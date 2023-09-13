import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { icons, path } from "utils";
import { getCurrentUser } from "redux/user/userAction";
import { clearMessage, logout } from "redux/user/userSlice";
import withBaseLogic from "components/Hoc/withBaseLogic";

const { FaRegMoneyBillAlt, BiLogOut } = icons;
const HeaderTop = ({ dispatch, navigate }) => {
  const { isLogin, current, mes } = useSelector((state) => state.user);

  useEffect(() => {
    const setTimeOutId = setTimeout(() => {
      if (isLogin) {
        dispatch(getCurrentUser());
      }
    }, 300);
    return () => {
      setTimeOutId && clearTimeout(setTimeOutId);
    };
  }, [isLogin, dispatch]);

  useEffect(() => {
    if (mes) {
      Swal.fire("Oops!", mes, "info").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
    }
  }, [mes]);
  return (
    <div className="w-full flex bg-[#ee3131] py-[10px] text-xs text-white md:hidden">
      <div className="w-full xl:w-main m-auto flex justify-between items-center">
        <div className="flex gap-3">
          <span className="border-r border-[rgba(255,255,255,.3)] pr-[10px]">
            ORDER ONLINE OR CALL US (+1800) 000 8808
          </span>
          <span className="flex items-center gap-2">
            <FaRegMoneyBillAlt />
            VND
          </span>
        </div>
        <div>
          {isLogin && current ? (
            <span className="flex items-center gap-2 ">
              {`Welcome, ${current && current?.firstName} ${
                current && current?.lastName
              }`}
              <span
                className="cursor-pointer  rounded-full"
                onClick={() => dispatch(logout())}
              >
                <BiLogOut size={17} />
              </span>
            </span>
          ) : (
            <NavLink to={`${path.LOGIN}`} className="hover:text-black">
              Sign In or Create Account
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default withBaseLogic(HeaderTop);
