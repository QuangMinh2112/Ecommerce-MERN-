import clsx from "clsx";
import React from "react";

const Button = ({ handleOnClick, style, type = "button", children, fw }) => {
  return (
    <button
      type={type}
      className={clsx(
        style
          ? style
          : `px-4 py-2 rounded-md text-white bg-main outline-none font-semibold my-2 ${
              fw ? "w-full" : "w-fit"
            }`
      )}
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {children}
    </button>
  );
};

export default Button;
