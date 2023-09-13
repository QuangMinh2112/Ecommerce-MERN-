import React, { memo, useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { icons } from "utils";
import { voteOptions } from "utils/Menu";
import Button from "components/Common/Button";
const { AiFillStar } = icons;
function VoteOption({ title, handleSubmitVoteOptions }) {
  const modalRef = useRef();
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState("");
  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
      className="w-[700px] h-[500px] flex flex-col items-center justify-center gap-5 p-4 bg-white"
    >
      <img src={logo} alt="logo" className="w-[300px] object-cover" />
      <h1>Please votings for the product {title}</h1>
      <textarea
        className="w-full h-[100px] border outline-none p-3"
        placeholder="Type something"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="w-full flex flex-col gap-4">
        <p className="w-full text-center">How do you like this product ?</p>
        <div className="flex gap-4 justify-center">
          {voteOptions?.map((item) => (
            <div
              key={item.id}
              onClick={() => setStar(item.id)}
              className="bg-gray-200 hover:bg-gray-300 w-[90px] h-[90xp] rounded-md p-4 flex items-center justify-center flex-col gap-2 cursor-pointer"
            >
              {Number(star) && star >= item.id ? (
                <AiFillStar color="orange" />
              ) : (
                <AiFillStar color="gray" />
              )}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Button
        fw
        handleOnClick={() => handleSubmitVoteOptions({ comment, star })}
      >
        Submit
      </Button>
    </div>
  );
}

export default memo(VoteOption);
