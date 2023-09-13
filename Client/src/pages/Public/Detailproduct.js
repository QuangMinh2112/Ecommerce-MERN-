import React, { useCallback, useEffect, useRef, useState } from "react";
import { createSearchParams, useLocation, useParams } from "react-router-dom";
import { apiGetDetailsProduct } from "../../apis/product";
import {
  BreadCrumb,
  Button,
  CustomSlider,
  ProductImageSlider,
  ProductInfo,
  SelectQuantity,
  withBaseLogic,
} from "../../components";
import { formatPrice, ratingStar } from "../../utils/helper";
import { images } from "../../assets/images/index";
import icons from "../../utils/icons";
import { apiAddCart, apiGetProducts } from "../../apis";
import * as DOMPurify from "dompurify";
import clsx from "clsx";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { path } from "utils";
import { toast } from "react-toastify";
import { getCurrentUser } from "redux/user/userAction";
const { BsDot } = icons;
var screenWidth;
const Detailproduct = ({
  isQuickView,
  datas,
  handleQuantityQuickView,
  dispatch,
  navigate,
  location,
}) => {
  const { pathname } = useLocation();
  const { current } = useSelector((state) => state.user);
  const params = useParams();
  const modelQuickViewRef = useRef();
  const [data, setData] = useState([]);
  const [valueQuantity, setValueQuantity] = useState(1);
  const [currentImages, setCurrentImages] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [update, setUpdate] = useState(false);
  const [variant, setVariant] = useState(null);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [id, setId] = useState(null);
  const [category, setCategory] = useState(null);
  const [smScreen, setSmScreen] = useState(false);
  const [mdScreen, setMdScreen] = useState(false);

  useEffect(() => {
    if (datas) {
      setId(datas.id);
      setCategory(datas?.category);
    } else if (params && params.id) {
      setId(params.id);
      setCategory(params.category);
    }
  }, [datas, params]);
  const fetchDetailProduct = async () => {
    const res = await apiGetDetailsProduct(id);
    if (res.success) {
      setData(res.message);
      setCurrentImages(res.message.images);
    }
  };

  const fetchDetailCategoryProduct = async () => {
    const res = await apiGetProducts({ category });
    if (res.success) {
      setRelatedProduct(res.products);
    }
  };
  useEffect(() => {
    if (id) {
      fetchDetailCategoryProduct();
      fetchDetailProduct();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchDetailProduct();
    }
  }, [update]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (variant) {
      setCurrentProduct({
        title: data?.variants?.find((i) => variant === i.sku)?.title,
        color: data?.variants?.find((i) => variant === i.sku)?.color,
        images: data?.variants?.find((i) => variant === i.sku)?.images,
        thumb: data?.variants?.find((i) => variant === i.sku)?.thumb,
        price: data?.variants?.find((i) => variant === i.sku)?.price,
      });
    }
  }, [variant]);

  useEffect(() => {
    handleQuantityQuickView && handleQuantityQuickView(valueQuantity);
  }, [valueQuantity]);

  useEffect(() => {
    modelQuickViewRef.current.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      screenWidth = window.innerWidth;
      if (screenWidth > 560 && screenWidth <= 650) {
        setMdScreen(true);
      } else {
        setMdScreen(false);
      }

      if (screenWidth <= 560) {
        setSmScreen(true);
      } else {
        setSmScreen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  const handleQuantity = (number) => {
    if (!Number(number) || Number(number) < 1) {
      return;
    } else {
      setValueQuantity(number);
    }
  };

  const handleChangeQuantity = (flag) => {
    if (flag === "minus" && valueQuantity <= 1) return;
    if (flag === "minus") setValueQuantity((prev) => prev - 1);
    if (flag === "plus") setValueQuantity((prev) => prev + 1);
  };

  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  const handleAddToCart = async () => {
    if (!current) {
      Swal.fire({
        title: "Please go to login?",
        text: "Do you want go to login?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
        }
      });
    } else {
      const response = await apiAddCart({
        productId: id,
        color:
          currentProduct.length === 0 ? data?.color : currentProduct?.color,
        quantity: valueQuantity,
        price:
          currentProduct.length === 0 ? data?.price : currentProduct?.price,
        thumbnail:
          currentProduct.length === 0 ? data?.thumb : currentProduct?.images[0],
        title:
          currentProduct.length === 0 ? data?.title : currentProduct?.title,
      });
      if (response.success) {
        toast.success(response.message);
        dispatch(getCurrentUser());
      }
    }
  };
  return (
    <div className="w-full">
      {!isQuickView && (
        <header className="bg-[#f7f7f7] mt-[-20px] p-[15px] flex items-center justify-center">
          <div className="w-main">
            <h3 className="font-semibold text-[18px] mb-[10px]">
              {data?.title}
            </h3>
            <BreadCrumb
              category={category}
              title={
                data?.variants?.find((el) => el.sku === variant)?.title ||
                data?.title
              }
            />
          </div>
        </header>
      )}
      <div
        className={clsx(
          "w-full xl:w-main m-auto flex mt-5 bg-white md:flex-col md:justify-center md:items-center",
          isQuickView && "justify-center p-10"
        )}
        ref={modelQuickViewRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[39%] md:w-full gap-4">
          <ProductImageSlider
            images={
              currentProduct?.images?.length >= 1
                ? currentProduct.images
                : currentImages
            }
          />
        </div>
        <div className="w-[39%] md:w-full">
          <div className="w-full px-5">
            <h1 className="font-semibold mb-5">{`${formatPrice(
              data?.variants?.find((el) => el.sku === variant)?.price ||
                data?.price
            )} VND`}</h1>
            <span className="flex gap-2 items-center">
              <span className="flex">{ratingStar(data?.totalRatings)}</span>
              <span>{data?.ratings?.length} review</span>
            </span>
            <ul className="mt-5">
              {data?.description?.length > 1 &&
                data?.description?.map((item) => (
                  <li key={item} className="flex items-center mb-[5px] gap-2">
                    <BsDot size={20} />
                    {item}
                  </li>
                ))}
              {data?.description?.length === 1 && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data?.description),
                  }}
                ></div>
              )}
            </ul>
            <div className="my-4 flex gap-4">
              <span className="font-semibold">Color: </span>
              <div className="flex flex-wrap gap-4 w-full">
                <div
                  onClick={() => {
                    setVariant(null);
                    setCurrentProduct([]);
                  }}
                  className={clsx(
                    "flex items-center gap-2 border cursor-pointer p-2",
                    !variant && "border-red-400"
                  )}
                >
                  <img
                    src={data?.thumb}
                    alt=""
                    className="w-8 h-8 object-cover rounded"
                  />
                  <span className="flex flex-col text-sm">
                    <span className="font-semibold">{data?.color}</span>
                    <span className="text-[12px]">{`${formatPrice(
                      Number(data?.price)
                    )} VND`}</span>
                  </span>
                </div>
                {data?.variants &&
                  data?.variants?.map((item) => (
                    <div
                      onClick={() => setVariant(item.sku)}
                      key={item?.sku}
                      className={clsx(
                        "flex items-center gap-2 border cursor-pointer p-2",
                        variant === item.sku && "border-red-400"
                      )}
                    >
                      <img
                        src={item?.images[0]}
                        alt="images"
                        className="w-8 h-8 object-cover rounded"
                      />
                      <span className="flex flex-col text-sm">
                        <span className="font-semibold">{item?.color}</span>
                        <span className="text-[12px]">{`${formatPrice(
                          Number(item?.price)
                        )} VND`}</span>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="mb-5 flex items-center">
              <SelectQuantity
                valueQuantity={valueQuantity}
                handleQuantity={handleQuantity}
                handleChangeQuantity={handleChangeQuantity}
              />
            </div>
            <div className="w-full">
              <Button
                type="submit"
                handleOnClick={handleAddToCart}
                style="bg-[#ee3131] text-white w-full py-[10px] px-[25px] uppercase tracking-normal hover:bg-[#333] duration-500 ease-in-out"
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
        {!isQuickView && (
          <div className="w-[22%] md:flex md:w-full md:gap-2 md:mt-4">
            <div className="flex w-full border justify-around text-sm mb-3 p-[10px]">
              <img src={images.delivery.default} alt="/" />
              <span className="flex flex-col">
                <span>Free shipping</span>
                <span className="text-gray-400">Orders over $200</span>
              </span>
            </div>
            <div className="flex w-full border justify-around text-sm mb-3  p-[10px]">
              <img src={images.money.default} alt="/" />
              <span className="flex flex-col">
                <span>Free shipping</span>
                <span className="text-gray-400">Orders over $200</span>
              </span>
            </div>
            <div className="flex w-full border justify-around text-sm  p-[10px]">
              <img src={images.service.default} alt="/" />
              <span className="flex flex-col">
                <span>Free shipping</span>
                <span className="text-gray-400">Orders over $200</span>
              </span>
            </div>
          </div>
        )}
      </div>
      {!isQuickView && (
        <div className="w-full xl:w-main m-auto mt-8">
          <ProductInfo
            totalRatings={data?.totalRatings}
            ratings={data?.ratings}
            title={data?.title}
            pid={data?._id}
            rerender={rerender}
          />
        </div>
      )}
      {!isQuickView && (
        <>
          <div className="w-full xl:w-main m-auto mt-8">
            <h3 className="text-[20px] font-semibold py-[15x] border-b-2 border-main">
              OTHER CUSTOMERS ALSO BUY:
            </h3>
            <div className="mt-4 mx-[-10px]">
              <CustomSlider
                toShow={smScreen ? 1 : mdScreen ? 2 : 4}
                isHideNew={true}
                products={relatedProduct}
              />
            </div>
          </div>
          <div className="h-[100px] w-full"></div>
        </>
      )}
    </div>
  );
};

export default withBaseLogic(Detailproduct);
