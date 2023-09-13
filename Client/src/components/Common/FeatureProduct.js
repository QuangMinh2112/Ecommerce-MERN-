import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Productcard from "../Products/Card";

const FeatureProduct = () => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await apiGetProducts({ limit: 9, sort: "-totalRatings" });
      if (res.success) setProducts(res?.products);
    };
    fetchProduct();
  }, []);
  return (
    <div className="w-full xl:w-main">
      <h3 className="text-[20px] font-semibold py-[15x] border-b-2 border-main">
        FEATURE PRODUCT
      </h3>
      <div className="w-full flex flex-wrap gap-1 mt-[15px] mx-[10px]">
        {products &&
          products?.map((item) => (
            <Productcard
              key={item._id}
              id={item._id}
              title={item.title}
              price={item.price}
              totalRatings={item.totalRatings}
              image={item.thumb}
              category={item.category}
            />
          ))}
      </div>
      <div className="grid grid-cols-4 grid-rows-2 gap-4 md:hidden">
        <div className="image-wrapper col-span-2 row-span-2">
          <LazyLoadImage
            src={
              "https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
            }
            alt="images"
            className="w-full h-full object-cover "
          />
        </div>

        <div className="image-wrapper col-span-1 row-span-1">
          <LazyLoadImage
            src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-bottom-home2_400x.jpg?v=1613166661"
            alt="images"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="image-wrapper col-span-1 row-span-2">
          <LazyLoadImage
            src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
            alt="images"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="image-wrapper col-span-1 row-span-1">
          <LazyLoadImage
            src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner3-bottom-home2_400x.jpg?v=1613166661"
            alt="images"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureProduct;
