import MemberSidebar from "components/Sidebar/Member";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutMember = () => {
  return (
    <div className="flex w-full min-h-screen relative">
      <div className="min-w-[270px] max-w-[270px] top-0 bottom-0 fixed">
        <MemberSidebar />
      </div>
      <div className="w-[270px]"></div>
      <div className="flex-auto bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutMember;
