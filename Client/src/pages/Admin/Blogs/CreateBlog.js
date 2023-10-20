import { apiCreateBlog, apiCreateProduct } from "apis";
import { Button, InputForm, SelectForm } from "components";
import Markdown from "components/Inputs/Markdown";
import Loading from "components/Loading";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { showModal } from "redux/app/appSlice";
import { getBase64, validate } from "utils/helper";

const CreateBlog = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [payload, setPayload] = useState({
    description: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const handleCreateBlog = async (data) => {
    const invalid = validate(payload, setInvalidFields);
    if (invalid === 0) {
      const finalPayload = { ...data, ...payload };
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.images)
        formData.append("images", finalPayload.images[0]);

      const response = await apiCreateBlog(formData);
      console.log(response);

      // if (response.success) {
      //   reset();
      //   setPayload(null);
      //   toast.success(response.message);
      // } else {
      //   toast.error(response.message);
      // }
    }
  };

  return (
    <div className="w-full">
      <h1 className="h-[75px] flex items-center text-3xl justify-between font-bold px-4 border-b">
        <span>Create Blog</span>
      </h1>
      <div className="p-4 bg-[#ecf0f1] h-fit">
        <form onSubmit={handleSubmit(handleCreateBlog)}>
          <InputForm
            label={"Title blogs"}
            fullWidth
            register={register}
            errors={errors}
            id="title"
            validate={{ required: "Field requied" }}
            placeholder="Title"
          />
          <div className="flex flex-col gap-2 my-4">
            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="file">Choose file to upload Thumb</label>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/png, image/jpeg"
                {...register("images", { required: "Need Field" })}
              />
              {errors["images"] && (
                <small className="text-xs text-red-500">
                  {errors["images"].message}
                </small>
              )}
            </div>
          </div>
          <Markdown
            label="Description"
            name="description"
            changeValue={changeValue}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />

          <Button type="submit">Create product</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
