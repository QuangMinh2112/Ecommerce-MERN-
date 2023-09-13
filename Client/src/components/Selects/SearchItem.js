import React, { memo, useEffect, useState } from "react";
import { icons } from "../../utils";
import { colors } from "../../utils/Menu";
import {
  createSearchParams,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { apiGetProducts } from "../../apis/product";
import { formatPrice } from "../../utils/helper";
import useDebounce from "hooks/useDebounce";
import withBaseLogic from "components/Hoc/withBaseLogic";
const { AiOutlineDown } = icons;

const SearchItem = ({ name, active, navigate, handleClickSelected, type }) => {
  const { category } = useParams();
  const [params] = useSearchParams();
  const [selected, setSelected] = useState([]);
  const [bestPrice, setBestPrice] = useState(null);
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });
  const handleSelect = (e) => {
    const alReady = selected?.find((el) => el === e.target.value);
    if (alReady) {
      setSelected((prev) => prev.filter((el) => el !== e.target.value));
    } else {
      setSelected((prev) => [...prev, e.target.value]);
    }
    handleClickSelected(null);
  };

  const fetchBestPriceProduct = async () => {
    const response = await apiGetProducts({ sort: "-price", limit: 1 });
    if (response.success) {
      setBestPrice(response.products[0].price);
    }
  };
  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];

    if (selected.length > 0) {
      queries.color = selected.join(",");
      queries.page = 1;
    } else {
      delete queries.color;
    }
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [selected]);

  useEffect(() => {
    if (type === "input") fetchBestPriceProduct();
  }, [type]);

  const debounceFrom = useDebounce(price.from, 500);
  const debounceTo = useDebounce(price.to, 500);

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (Number(price.from) > 0) {
      queries.from = price.from;
    } else {
      delete queries.from;
    }
    if (Number(price.to) > 0) {
      queries.to = price.to;
    } else {
      delete queries.to;
    }
    queries.page = 1;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [debounceFrom, debounceTo]);

  useEffect(() => {
    if (
      Number(price.from) &&
      Number(price.to) &&
      Number(price.from) > Number(price.to)
    ) {
      alert("Price from can't be greater than to price To");
    }
  }, [price]);
  return (
    <div
      className="p-3 relative gap-6 border text-gray-500 border-gray-800 flex justify-between items-center"
      onClick={() => handleClickSelected(name)}
    >
      <span>{name}</span>
      <AiOutlineDown />
      {active === name && (
        <div className="absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-3 border bg-white min-w-[150px]">
          {type === "checkbox" && (
            <div className="p-2">
              <div className="flex p-4 items-center justify-between gap-8">
                <span className="whitespace-nowrap">{`${selected?.length} selected`}</span>
                <span
                  className="underline hover:text-main cursor-pointer"
                  onClick={(e) => {
                    setSelected([]);
                    e.stopPropagation();
                    handleClickSelected(null);
                  }}
                >
                  Reset
                </span>
              </div>
              <div
                className="flex flex-col gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                {colors.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      key={index}
                      name={item}
                      alt="checkbox"
                      className="w-4 h-4 cursor-pointer"
                      id={item}
                      value={item}
                      onChange={handleSelect}
                      checked={selected?.some((el) => el === item)}
                    />
                    <label
                      className="capitalize text-gray-700 cursor-pointer"
                      htmlFor={item}
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === "input" && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="flex p-4 items-center justify-between gap-8">
                <span className="whitespace-nowrap">{`The highest price is ${formatPrice(
                  bestPrice
                )} VND`}</span>
                <span
                  className="underline cursor-pointer hover:text-main"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrice({ from: "", to: "" });
                    handleClickSelected(null);
                  }}
                >
                  Reset
                </span>
              </div>
              <div className="flex items-center p-2 gap-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="from">From</label>
                  <input
                    type="number"
                    alt="price"
                    id="from"
                    value={price.from}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, from: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="from">To</label>
                  <input
                    type="number"
                    alt="price"
                    id="from"
                    value={price.to}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, to: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default withBaseLogic(memo(SearchItem));
