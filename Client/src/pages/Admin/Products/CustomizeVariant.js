import { apiAddVariant } from "apis";
import { Button, InputForm } from "components";
import Loading from "components/Loading";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { showModal } from "redux/app/appSlice";
import Swal from "sweetalert2";
import { getBase64 } from "utils/helper";

const CustomizeVariant = ({
  customizeVariant,
  setCustomizeVariant,
  render,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();
  const [preview, setPreview] = useState({
    thumb: "",
    images: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    reset({
      title: customizeVariant?.title || "",
      price: customizeVariant?.price || "",
      color: customizeVariant?.color || "",
    });
  }, [customizeVariant]);

  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb")?.length > 0) {
      handlePreviewThumb(watch("thumb")[0]);
    }
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images")?.length > 0) {
      handlePreviewImages(watch("images"));
    }
  }, [watch("images")]);

  const handleAddVariant = async (data) => {
    if (data.color === customizeVariant.color) {
      Swal.fire("Oops!", "You have to change the color", "info");
    } else {
      const formData = new FormData();
      for (let i of Object.entries(data)) formData.append(i[0], i[1]);
      if (data.thumb) formData.append("thumb", data.thumb[0]);
      if (data.images) {
        for (let image of data.images) formData.append("images", image);
      }
      // dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiAddVariant(formData, customizeVariant._id);
      if (response.success) {
        toast.success(response.message);
        // dispatch(showModal({ isShowModal: false, modalChildren: null }));
      } else toast.error(response.message);
    }
  };

  const handlePreviewThumb = async (file) => {
    const fileBase64 = await getBase64(file);
    if (file) {
      setPreview((prev) => ({ ...prev, thumb: fileBase64 }));
    }
  };
  const handlePreviewImages = async (files) => {
    const imagesArr = [];
    for (let file of files) {
      if (file.type !== "image/jpeg") {
        toast.warn("File not supported !");
        return;
      } else {
        const base64 = await getBase64(file);
        imagesArr.push(base64);
      }
    }
    if (files?.length > 0) {
      setPreview((prev) => ({ ...prev, images: imagesArr }));
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[69px]"></div>
      <div className="p-4 border-b bg-gray-100 flex justify-between items-center right-0 left-[270px] fixed z-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Customize variant Product
        </h1>
        <span
          className=" hover:underline hover:text-red-400 cursor-pointer"
          onClick={() => setCustomizeVariant(null)}
        >
          Cancle
        </span>
      </div>
      <form
        className="p-4 flex flex-col gap-4"
        action=""
        onSubmit={handleSubmit(handleAddVariant)}
      >
        <div className="flex gap-4 items-center w-full">
          <InputForm
            label={"Original name"}
            fullWidth
            register={register}
            errors={errors}
            id="title"
            styles="flex-auto"
          />
        </div>
        <div className="flex w-full gap-4">
          <InputForm
            label={"Price Variant"}
            fullWidth
            register={register}
            errors={errors}
            id="price"
            placeholder="Price"
            styles="flex flex-auto"
          />
          <InputForm
            label={"Color Variant"}
            fullWidth
            register={register}
            errors={errors}
            id="color"
            placeholder="Color"
            styles="flex flex-auto"
          />
        </div>
        <div className="mt-6">
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="file">Choose file to upload Thumb</label>
            <input
              type="file"
              id="thumb"
              name="thumb"
              accept="image/png, image/jpeg"
              {...register("thumb")}
            />
            {errors["thumb"] && (
              <small className="text-xs text-red-500">
                {errors["thumb"].message}
              </small>
            )}
          </div>
          {preview?.thumb && (
            <div className="thumb ">
              <img
                src={preview?.thumb}
                alt="Thumbnail"
                className="w-[200px] h-[200px] object-cover rounded-md"
              />
            </div>
          )}
          <div className="flex flex-col gap-2 my-4">
            <label htmlFor="file">Choose file to upload images</label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/png, image/jpeg"
              multiple
              {...register("images")}
            />
            {errors["images"] && (
              <small className="text-xs text-red-500">
                {errors["images"].message}
              </small>
            )}
          </div>
          {preview?.images?.length > 0 && (
            <div className="flex gap-2 my-4">
              {preview?.images.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt="Images"
                  className="w-[200px] h-[200px] object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>
        <Button type="submit">Update variant product</Button>
      </form>
    </div>
  );
};

export default CustomizeVariant;
