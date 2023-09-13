import React from "react";
import clsx from "clsx";
import {
  createSearchParams,
  useParams,
  useSearchParams,
} from "react-router-dom";
import withBaseLogic from "components/Hoc/withBaseLogic";

function PaginationItem({ children, navigate }) {
  const [params] = useSearchParams();
  const { category } = useParams();

  const handlePagination = () => {
    let param = [];
    for (let i of params.entries()) param.push(i);

    const queries = {};

    for (let i of param) queries[i[0]] = i[1];
    if (Number(children)) {
      queries.page = children;
    }
    navigate({
      path: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  };
  return (
    <button
      className={clsx(
        "w-10 h-10 text-black flex justify-center rounded-full ",
        !Number(children) && "items-end pb-1",
        Number(children) && "items-center hover:bg-gray-300",
        +params.get("page") === +children && "rounded-full bg-gray-300",
        !params.get("page") && children === 1 && "rounded-full bg-gray-300"
      )}
      onClick={handlePagination}
      disabled={!Number(children)}
    >
      {children}
    </button>
  );
}

export default withBaseLogic(PaginationItem);
