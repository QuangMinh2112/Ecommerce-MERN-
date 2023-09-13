import clsx from "clsx";
import React, { memo } from "react";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
  style,
  fullWidth,
  placeholder,
  isHideLabel,
}) => {
  return (
    <div className={clsx(" relative flex flex-col", fullWidth && "w-full")}>
      {!isHideLabel && value.trim() !== "" && (
        <label
          htmlFor={nameKey}
          className="text-[12px] absolute top-0 left-[12px] animate-slide-top-sm block bg-white px-1"
        >
          {nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
        </label>
      )}
      <input
        type={type || "text"}
        value={value}
        placeholder={
          placeholder || nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)
        }
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        className={clsx(
          "px-4 py-2 rounded-sm w-full my-2 border outline-none bg-white",
          style
        )}
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {invalidFields?.some((i) => i.name === nameKey) && (
        <span className="text-main text-sm">
          {invalidFields?.find((i) => i.name === nameKey)?.message}
        </span>
      )}
    </div>
  );
};

export default memo(InputField);
