import { NavLink } from "react-router-dom";
import { icons } from "utils";
import { sidebar } from "utils/Menu";
const { BiMenu } = icons;
const Sidebar = () => {
  return (
    <div className="flex flex-col border md:hidden">
      <div className="font-medium flex items-center gap-2 bg-red-500 text-white pt-[15px] pr-5 pb-[14px] pl-5">
        {" "}
        <span>
          <BiMenu size={25} />
        </span>
        ALL COLLECTIONS
      </div>
      {sidebar &&
        sidebar?.map((item) => (
          <div
            key={item?.id}
            className="flex items-center gap-3 pt-[15px] pr-5 pb-[14px] pl-5 "
          >
            <span className="">{item?.icons}</span>
            <NavLink to={item?.path} className="text-sm hover:text-[#ee3131]">
              {item?.text}
            </NavLink>
          </div>
        ))}
    </div>
  );
};

export default Sidebar;
