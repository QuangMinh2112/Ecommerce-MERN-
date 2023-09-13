import React, { memo } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { icons } from "../../utils";
import { NavLink } from "react-router-dom";
const { MdKeyboardArrowRight } = icons;
const BreadCrumb = ({ title, category }) => {
  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "Home" },
    { path: "/:category/:id/:title", breadcrumb: title },
  ];
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className="flex text-sm">
      {breadcrumbs
        ?.filter((item, index) => index !== 2)
        ?.map(({ match, breadcrumb }, index, self) => (
          <NavLink
            className={`flex items-center ${
              breadcrumb?.props?.children !== title
                ? "hover:text-main"
                : "pointer-events-none"
            }`}
            key={match.pathname}
            to={match.pathname}
          >
            <span> {breadcrumb}</span>
            <span>
              {index !== self.length - 1 && <MdKeyboardArrowRight />}
            </span>{" "}
          </NavLink>
        ))}
    </div>
  );
};

export default memo(BreadCrumb);
