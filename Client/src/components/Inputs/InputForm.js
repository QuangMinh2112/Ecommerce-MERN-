import clsx from "clsx";
import React, { memo } from "react";

const InputForm = ({
  placeholder,
  handleChangeValue,
  label,
  disabled,
  errors,
  id,
  validate,
  type = "text",
  fullWidth,
  register,
  defaultValue,
  styles,
  readOnly,
  value,
}) => {
  return (
    <div className={clsx("flex flex-col h-[78px] gap-2", styles && styles)}>
      {label && (
        <label htmlFor={id} className="font-medium">
          {label + " :"}
        </label>
      )}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx("form-input my-auto", fullWidth && "w-full")}
        defaultValue={defaultValue}
        readOnly={readOnly}
        value={value}
      />
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id].message}</small>
      )}
    </div>
  );
};

export default memo(InputForm);
