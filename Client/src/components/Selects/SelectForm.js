import clsx from "clsx";
import React, { memo } from "react";

const SelectForm = ({
  options,
  handleChangeValue,
  label,
  errors,
  id,
  validate,
  fullWidth,
  register,
  defaultValue,
  styles,
}) => {
  return (
    <div className={clsx("flex flex-col h-[78px] gap-2", styles && styles)}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        {...register(id, validate)}
        defaultValue={defaultValue}
        className={clsx("form-select my-auto", fullWidth && "w-full", styles)}
      >
        <option value="">---Chose---</option>
        {options?.map((el) => (
          <option value={el.code} key={el.code}>
            {el.value}
          </option>
        ))}
      </select>
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id].message}</small>
      )}
    </div>
  );
};

export default memo(SelectForm);
