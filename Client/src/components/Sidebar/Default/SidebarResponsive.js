import clsx from "clsx";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { showSideBar } from "redux/app/appSlice";
import { icons } from "utils";
import { sideBarMobile } from "utils/Menu";
const { AiOutlineCaretDown, AiOutlineCaretRight, AiOutlineLogin } = icons;

const SidebarResponsive = () => {
  const [activeSubmenu, setActiveSubmenu] = useState([]);
  const dispatch = useDispatch();
  const handleClickDropSubmenu = (tabId) => {
    if (activeSubmenu?.some((el) => el === tabId)) {
      setActiveSubmenu((prev) => prev.filter((el) => el !== tabId));
    } else {
      setActiveSubmenu((prev) => [...prev, tabId]);
    }
  };
  return (
    <div
      className="w-[400px] bg-[#1c1d1d] max-h-screen overflow-y-auto text-white p-6 grid grid-rows-10 animate-slide-right"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="flex justify-end"
        onClick={() => dispatch(showSideBar({ signal: false }))}
      >
        X
      </div>
      <div className="flex flex-col gap-1">
        {sideBarMobile?.map((el) => (
          <Fragment key={el.id}>
            {el.type === "Single" && (
              <NavLink
                to={el.path}
                className="p-[10px]"
                onClick={() => dispatch(showSideBar({ signal: false }))}
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === "Parent" && (
              <div className="flex flex-col text-gray-200">
                <div
                  className="flex py-2 justify-between cursor-pointer"
                  onClick={() => handleClickDropSubmenu(el.id)}
                >
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  {activeSubmenu?.some((id) => id === el.id) ? (
                    <AiOutlineCaretDown />
                  ) : (
                    <AiOutlineCaretRight />
                  )}
                </div>
                {activeSubmenu.some((id) => id === el.id) && (
                  <div className="flex flex-col">
                    {el.submenu.map((el) => (
                      <NavLink
                        className={clsx("pl-10 p-[10px]")}
                        key={el.text}
                        to={el.path}
                        onClick={() => dispatch(showSideBar({ signal: false }))}
                      >
                        {el.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
        <div className="flex gap-1 items-center">
          <AiOutlineLogin color="white" />
          LOGIN
        </div>
        <div>Search something</div>
      </div>
    </div>
  );
};

export default SidebarResponsive;
