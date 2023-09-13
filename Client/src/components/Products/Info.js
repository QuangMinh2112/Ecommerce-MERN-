import React, { memo, useCallback, useState } from "react";
import { productInfoTabs } from "utils/Menu";
import { ratingStar } from "utils/helper";
import { useSelector } from "react-redux";
import { showModal } from "redux/app/appSlice";
import Swal from "sweetalert2";
import { path } from "utils";
import Button from "components/Common/Button";
import { apiRatings } from "apis";
import Comment from "components/Ratings/Comment";
import VoteOption from "components/Ratings/VoteOption";
import VoteBar from "components/Ratings/VoteBar";
import withBaseLogic from "components/Hoc/withBaseLogic";

const ProductInfo = ({
  totalRatings,
  ratings,
  title,
  pid,
  rerender,
  dispatch,
  navigate,
}) => {
  const { isLogin } = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState(1);

  const handleSubmitVoteOptions = useCallback(
    async ({ star, comment }) => {
      if (!star || !comment || !pid) {
        Swal.fire("Oop!", "Vui lòng điền đầy đủ thông tin !", "error");
      } else {
        const res = await apiRatings({
          star,
          comment,
          productId: pid,
          updatedAt: Date.now(),
        });
        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Thank you for your feedback!",
            showConfirmButton: false,
            timer: 1500,
          });
          rerender();
          dispatch(showModal({ isShowModal: false }));
        }
      }
    },
    [pid]
  );

  const handleCheckIslogin = () => {
    if (!isLogin) {
      Swal.fire({
        title: "Please go to login before Votings?",
        icon: "question",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption
              handleSubmitVoteOptions={handleSubmitVoteOptions}
              title={title}
            />
          ),
        })
      );
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 relative bottom-[-1px] md:flex-col md:gap-0">
        {productInfoTabs.map((el) => (
          <span
            onClick={() => setActiveTab(el.id)}
            className={`p-2 px-4 cursor-pointer md:w-full ${
              activeTab === el.id
                ? "bg-white border border-b-0"
                : "bg-[#f1f1f1] "
            }`}
            key={el.id}
          >
            {el.name}
          </span>
        ))}
        <span
          className={`p-2 px-4 cursor-pointer md:w-full ${
            activeTab === 5 ? "bg-white border border-b-0" : "bg-[#f1f1f1] "
          }`}
          onClick={() => setActiveTab(5)}
        >
          CUSTOMER REVIEW
        </span>
      </div>
      <div className="w-full mb-8 border">
        <p className="p-4">
          {productInfoTabs?.some((el) => el.id === activeTab) &&
            productInfoTabs?.find((el) => el.id === activeTab)?.description}
        </p>
        {activeTab === 5 && (
          <div className="flex flex-col p-4">
            <div className="flex md:flex-col">
              <div className="w-[40%] md:w-full md:py-3 border flex flex-col items-center justify-center">
                <span className="font-semibold text-main text-4xl">{`${totalRatings}/5`}</span>
                <span className="flex items-center gap-1">
                  {ratingStar(totalRatings)?.map((el, index) => (
                    <span key={index}>{el}</span>
                  ))}
                </span>
                <span className="text-sm">
                  ({`${ratings?.length} reviews and ${ratings?.length} comment`}
                  )
                </span>
              </div>
              <div className="w-[60%] md:w-full border flex flex-col gap-2 p-3">
                {Array.from(Array(5).keys())
                  .reverse()
                  .map((el) => (
                    <VoteBar
                      key={el}
                      number={el + 1}
                      ratingTotal={ratings.length}
                      ratingCount={
                        ratings.filter((i) => i.star === el + 1)?.length
                      }
                    />
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4 items-center justify-center">
              <span>Do you want ratings this product !</span>
              <Button handleOnClick={handleCheckIslogin}>Vote Now!</Button>
            </div>
            <div className="flex flex-col gap-5">
              {ratings?.map((item) => (
                <Comment
                  key={item._id}
                  comment={item.comment}
                  star={item.star}
                  updatedAt={item?.updatedAt}
                  name={`${item.postedBy.firstName} ${item.postedBy.lastName}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default withBaseLogic(memo(ProductInfo));
