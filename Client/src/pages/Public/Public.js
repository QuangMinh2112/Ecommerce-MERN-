import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Navbar, Footer, HeaderTop } from "../../components";
import { useSelector } from "react-redux";
import clsx from "clsx";

const Public = () => {
  const { isShowCart, isShowModal, isShowSideBar } = useSelector(
    (state) => state.app
  );
  useEffect(() => {
    if (isShowCart || isShowModal || isShowSideBar) {
      document.body.classList.add("hide_scrollY");
    } else {
      document.body.classList.remove("hide_scrollY");
    }
  }, [isShowCart, isShowModal, isShowSideBar]);
  return (
    <>
      <div className={clsx("flex flex-col items-center md:px-[25px]")}>
        <HeaderTop />
        <Header />
        <Navbar />

        <div className="w-full  flex items-center flex-col">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Public;
