import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Pagination, withBaseLogic } from "components";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiGetProducts } from "apis";
import useDebounce from "hooks/useDebounce";
import moment from "moment";
import UpdateProduct from "./Update";
import CustomizeVariant from "./CustomizeVariant";
// import { icons } from 'utils'
// const {AiFillDelete,AiFillEdit} = icons

const ManageProduct = ({ navigate, location }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const [params] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [counts, setCounts] = useState();
  const [editProduct, setEditProduct] = useState(null);
  const [update, setUpdate] = useState(false);
  const [customizeVariant, setCustomizeVariant] = useState(null);
  const fetchProducts = async (params) => {
    const res = await apiGetProducts({ ...params, litmit: 10 });
    if (res.success) {
      setProducts(res?.products);
      setCounts(res.counts);
    }
  };
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  const debounceSearch = useDebounce(watch("q"), 800);

  useEffect(() => {
    if (debounceSearch) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: debounceSearch }).toString(),
      });
    } else {
      navigate({ pathname: location.pathname });
    }
  }, [debounceSearch]);
  useEffect(() => {
    const searchPrams = Object.fromEntries([...params]);
    fetchProducts({ ...searchPrams });
  }, [params, update]);
  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[69px]"></div>
      {editProduct && (
        <div className="absolute inset-0 z-50 bg-white">
          <UpdateProduct
            editProduct={editProduct}
            render={render}
            setEditProduct={setEditProduct}
          />
        </div>
      )}
      {customizeVariant && (
        <div className="absolute inset-0 z-50 bg-white">
          <CustomizeVariant
            customizeVariant={customizeVariant}
            render={render}
            setCustomizeVariant={setCustomizeVariant}
          />
        </div>
      )}
      <div className="p-4 border-b bg-gray-100 w-full flex justify-between items-center fixed">
        <h1 className="text-3xl font-bold tracking-tight">Manage Product</h1>
      </div>
      <div className="flex justify-end items-center px-4">
        <form className="w-[45%]" action="">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullWidth
            placeholder="Search product"
          />
        </form>
      </div>
      <div className="pl-1">
        <table className="table-auto w-full">
          <thead className="font-bold bg-gray-600  border border-gray-500 text-white">
            <tr className="border border-gray-500">
              <th className="text-center py-2">#</th>
              <th className="text-center py-2">Thumb</th>
              <th className="text-center py-2">Title</th>
              <th className="text-center py-2">Brand</th>
              <th className="text-center py-2">Category</th>
              <th className="text-center py-2">Price</th>
              <th className="text-center py-2">Quantity</th>
              <th className="text-center py-2">Sold</th>
              <th className="text-center py-2">Color</th>
              <th className="text-center py-2">Ratings</th>
              <th className="text-center py-2">Variant</th>
              <th className="text-center py-2">Created At</th>
              <th className="text-center py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-[#4f4b4b]">
            {products?.map((el, index) => (
              <tr className="border border-gray-500" key={el._id}>
                <td className="text-center py-2">
                  {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                    process.env.REACT_APP_LIMIT +
                    index +
                    1}
                </td>
                <td className="text-center py-2">
                  <img
                    src={el?.thumb}
                    alt="thumb"
                    className="h-12 w-12 object-cover"
                  />
                </td>
                <td className="text-center py-2">{el?.title}</td>
                <td className="text-center py-2">{el?.brand}</td>
                <td className="text-center py-2">{el?.category}</td>
                <td className="text-center py-2">{el?.price}</td>
                <td className="text-center py-2">{el?.quantity}</td>
                <td className="text-center py-2">{el?.sold}</td>
                <td className="text-center py-2">{el?.color}</td>
                <td className="text-center py-2">{el?.totalRatings}</td>
                <td className="text-center py-2">{el?.variants?.length}</td>
                <td className="text-center py-2">
                  {moment(el?.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="text-center py-2">
                  <span
                    className="px-1 text-blue-500 hover:underline cursor-pointer"
                    onClick={() => setEditProduct(el)}
                  >
                    Edit
                  </span>
                  <span className="px-1 text-blue-500 hover:underline cursor-pointer">
                    Remove
                  </span>
                  <span
                    className="px-1 text-blue-500 hover:underline cursor-pointer"
                    onClick={() => setCustomizeVariant(el)}
                  >
                    Variant
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default withBaseLogic(ManageProduct);
