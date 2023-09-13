import React from "react";
import { navPath } from "../../utils/Menu";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="w-full xl:w-main flex items-center justify-between mb-5 h-[48px] border-t border-b py-2 md:hidden">
      <div>
        {navPath.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "pr-10 hover:text-red-500 text-red-400"
                : "pr-10 hover:text-red-500"
            }
          >
            {item.text}
          </NavLink>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Search something"
          className="outline-none"
        />
      </div>
    </div>
  );
};

export default Navbar;
