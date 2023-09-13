import React, { Fragment, memo, useState } from "react";
import { memberSidebar } from "utils/Menu";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { icons } from "utils";
import { useSelector } from "react-redux";

const { AiOutlineCaretDown, AiOutlineCaretRight } = icons;

const isActiveStyle =
  "px-4 py-2 flex items-center gap-2 text-gray-200 bg-blue-500";
const notActiveStyle = "px-4 py-2 flex items-center gap-2";

const MemberSidebar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState([]);
  const { current } = useSelector((state) => state.user);
  const handleClickDropSubmenu = (tabId) => {
    if (activeSubmenu?.some((el) => el === tabId)) {
      setActiveSubmenu((prev) => prev.filter((el) => el !== tabId));
    } else {
      setActiveSubmenu((prev) => [...prev, tabId]);
    }
  };
  return (
    <div className="bg-[#fff] h-full py-4">
      <div className="flex flex-col justify-center items-center py-4 gap-2 border-b-2">
        <img
          src={
            current?.avatar ||
            "https://img.freepik.com/free-icon/user_318-159711.jpg"
          }
          alt="Avatar"
          className="w-16 h-16 object-cover"
        />
        <span>{`${current?.lastName} ${current.firstName}`}</span>
      </div>
      <div className="mt-5">
        {memberSidebar?.map((el) => (
          <Fragment key={el.id}>
            {el.type === "Single" && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  clsx(
                    isActive && isActiveStyle,
                    !isActive && notActiveStyle,
                    "px-4"
                  )
                }
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === "Parent" && (
              <div className="flex flex-col">
                <div
                  className="flex py-2 px-4 justify-between cursor-pointer hover:bg-[#3498db]"
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
                        className={({ isActive }) =>
                          clsx(
                            isActive && isActiveStyle,
                            !isActive && notActiveStyle,
                            "pl-10"
                          )
                        }
                        key={el.text}
                        to={el.path}
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
      </div>
    </div>
  );
};

export default memo(MemberSidebar);
