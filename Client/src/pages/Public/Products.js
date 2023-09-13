import React, { useCallback, useEffect, useState } from "react";
import {
  BreadCrumb,
  InputSelect,
  Pagination,
  Product,
  SearchItem,
} from "../../components";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { apiGetProducts } from "../../apis";
import Masonry from "react-masonry-css";
import { sorts } from "../../utils/Menu";
import { capitalize_Words } from "utils/helper";
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};
const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState();
  const [active, setActive] = useState(null);
  const [sort, setSort] = useState([]);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fetchPoructByCategory = async (queries) => {
    const res = await apiGetProducts({ ...queries, category });
    if (res.success) {
      setProducts(res);
    }
  };
  useEffect(() => {
    let param = [];
    let priceQueries = {};
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of params) queries[i[0]] = i[1];

    if (queries.to && queries.from) {
      priceQueries = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.price;
    }
    if (queries.from) queries.price = { gte: queries.from };
    if (queries.to) queries.price = { lte: queries.to };

    delete queries.to;
    delete queries.from;

    const result = { ...priceQueries, ...queries };

    fetchPoructByCategory(result);

    window.scroll(0, 0);
  }, [params]);

  useEffect(() => {
    if (sort) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({ sort }).toString(),
      });
    }
  }, [sort]);

  const handleClickSelected = useCallback(
    (name) => {
      if (active === name) {
        setActive(null);
      } else {
        setActive(name);
      }
    },
    [active]
  );

  const handleChangeSelect = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );
  return (
    <div className="w-full">
      <header className="bg-[#f7f7f7] mt-[-20px] p-[15px] flex items-center justify-center">
        <div className="w-main">
          <h3 className="font-semibold text-[18px] mb-[10px]">
            {capitalize_Words(location?.pathname?.split("/")[1])}
          </h3>
          <BreadCrumb category={category} />
        </div>
      </header>

      <div className="w-full xl:w-main border p-4 flex justify-between mt-8 m-auto">
        <div className="w-4/5 md:w-3/5 flex-auto flex flex-col gap-3">
          <span className="font-semibold text-sm">FilterBy</span>
          <div className="flex items-center gap-4">
            <SearchItem
              name="Price"
              active={active}
              setActive={setActive}
              handleClickSelected={handleClickSelected}
              type="input"
            />
            <SearchItem
              name="Color"
              active={active}
              setActive={setActive}
              handleClickSelected={handleClickSelected}
              type="checkbox"
            />
          </div>
        </div>
        <div className="w-1/5 md:w-2/5 flex flex-col gap-3">
          <span className="font-semibold text-sm">Sort</span>
          <div>
            <InputSelect
              options={sorts}
              handleChangeValue={handleChangeSelect}
            />
          </div>
        </div>
      </div>
      <div className="w-full xl:w-main mt-8 m-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex mx-[-10px]"
          columnClassName="my-masonry-grid_column"
        >
          {products?.products?.map((item) => (
            <Product key={item._id} data={item} />
          ))}
        </Masonry>
      </div>
      <div className="w-full xl:w-main m-auto my-5 flex justify-end">
        <Pagination totalCount={products?.counts} />
      </div>
      <div className="h-[100px] w-full"></div>
    </div>
  );
};

export default Products;
