import React, { memo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatPrice, ratingStar } from "utils/helper";
import newProduct from "../../assets/new.png";
import trending from "../../assets/trending.png";
import { useNavigate } from "react-router-dom";
import { icons, path } from "utils";
import SelectOption from "components/Selects/SelectOption";
import { showModal } from "redux/app/appSlice";
import { Detailproduct } from "pages/Public";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { apiAddCart } from "apis";
import { getCurrentUser } from "redux/user/userAction";
const {
  BsFillSuitHeartFill,
  AiFillEye,
  BsFillCartPlusFill,
  BsFillCartCheckFill,
} = icons;

const Product = ({ data, isNew, isHideNew }) => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  const { current } = useSelector((state) => state.user);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleQuantityQuickView = (number) => {
    setQty(number);
  };

  const handleClick = async (e, flag) => {
    e.stopPropagation();
    if (flag === "ADDCART") {
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
            navigate(`/${path.LOGIN}`);
          }
        });
      } else {
        const response = await apiAddCart({
          productId: data?._id,
          color: data?.color,
          thumbnail: data?.thumb,
          quantity: qty,
          title: data?.title,
          price: data?.price,
        });
        if (response.success) {
          toast.success(response.message);
          dispatch(getCurrentUser());
        } else {
          toast.error(response.message);
        }
      }
    }

    if (flag === "QUICKVIEW") {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <Detailproduct
              isQuickView
              datas={{ id: data?._id, category: data?.category }}
              handleQuantityQuickView={handleQuantityQuickView}
            />
          ),
        })
      );
    }
  };

  return (
    <div className="w-full text-base px-[10px] cursor-pointer">
      <div
        onClick={() =>
          navigate(`/${data.category.toLowerCase()}/${data._id}/${data.title}`)
        }
        className="w-full border p-[15px] flex flex-col items-center"
      >
        <div
          className={`w-full relative`}
          onMouseEnter={(e) => {
            e.stopPropagation();
            setIsShowOptions(true);
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setIsShowOptions(false);
          }}
        >
          {isShowOptions && (
            <div className="absolute bottom-0 right-0 left-0  flex justify-center gap-2 animate-slide-top">
              <span onClick={(e) => handleClick(e, "QUICKVIEW")}>
                <SelectOption icon={<AiFillEye />} />
              </span>
              {current?.cart?.some(
                (el) => el.product === data?._id.toString()
              ) ? (
                <span>
                  <SelectOption icon={<BsFillCartCheckFill color="green" />} />
                </span>
              ) : (
                <span onClick={(e) => handleClick(e, "ADDCART")}>
                  <SelectOption icon={<BsFillCartPlusFill />} />
                </span>
              )}
              <span onClick={(e) => handleClick(e, "wishlist")}>
                <SelectOption icon={<BsFillSuitHeartFill />} />
              </span>
            </div>
          )}
          <LazyLoadImage
            src={data.thumb}
            alt="product"
            className="object-cover "
            width="274"
            height="274"
          />
          {!isHideNew && (
            <LazyLoadImage
              src={isNew ? newProduct : trending}
              alt="label"
              className={`absolute w-[100px] h-[35px]  top-[0] right-[0] object-cover`}
            />
          )}

          <span
            className={`absolute top-[-15px] left-[-18px] text-white font-bold ${
              isNew ? "" : "text-sm"
            }`}
          >
            {isNew ? "New" : "Trending"}
          </span>
        </div>
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full">
          <span className="flex h-4">
            {ratingStar(data?.totalRatings, 14)?.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </span>
          <span className="line-clamp-1 font-semibold">{data?.title}</span>
          <span>{`${formatPrice(data?.price)} VNĐ`}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(Product);
