import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis/product";
import CustomSlider from "../Common/CustomSlider";
import { useDispatch, useSelector } from "react-redux";
import { getNewProduct } from "../../redux/product/asyncAction";
import { LazyLoadImage } from "react-lazy-load-image-component";
import clsx from "clsx";

const tabs = [
  {
    id: 0,
    name: "Best Seller",
  },
  {
    id: 1,
    name: "New Arrivals",
  },
];

const BestSeller = ({ toShowSm, toShowMd }) => {
  const [bestseller, setBestseller] = useState(null);
  const [products, setProducts] = useState(null);
  const [isActive, setIsActive] = useState(0);

  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await apiGetProducts({ sort: "-sold" });
      if (response.success) {
        setBestseller(response.products);
        setProducts(response.products);
      }
    };
    fetchProducts();
    dispatch(getNewProduct());
  }, []);

  useEffect(() => {
    if (isActive === 0) setProducts(bestseller);
    if (isActive === 1) setProducts(newProducts);
  }, [isActive]);
  return (
    <div className={clsx("w-full")}>
      <div className="flex text-[20px] ml-[-24px] ">
        {tabs.map((item) => (
          <span
            key={item.id}
            className={`font-semibold uppercase cursor-pointer px-6 border-r ${
              isActive === item.id ? "text-[#000]" : "opacity-50"
            }`}
            onClick={() => setIsActive(item.id)}
          >
            {item.name}
          </span>
        ))}
      </div>
      <div className="mt-4 pt-4 mx-[-10px] border-t-2 border-red-600">
        <CustomSlider
          products={products}
          isActive={isActive}
          toShow={toShowSm || toShowMd}
        />
      </div>
      <div className="w-full mt-4 flex gap-4">
        <div className="image-wrapper">
          <LazyLoadImage
            src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-home2_2000x_crop_center.png?v=1613166657"
            alt="banner"
            className="flex-1 object-contain"
          />
        </div>
        <div className="image-wrapper">
          <LazyLoadImage
            src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-home2_2000x_crop_center.png?v=1613166657"
            alt="banner"
            className="flex-1 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
