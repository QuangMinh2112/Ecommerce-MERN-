import { apiCreateProduct } from "apis";
import { Button, InputForm, SelectForm } from "components";
import Markdown from "components/Inputs/Markdown";
import Loading from "components/Loading";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { showModal } from "redux/app/appSlice";
import { getBase64, validate } from "utils/helper";

const CreateProduct = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const { categories } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    description: "",
  });
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  useEffect(() => {
    handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    handlePreviewImages(watch("images"));
  }, [watch("images")]);

  const handleCreateProduct = async (data) => {
    const invalid = validate(payload, setInvalidFields);
    if (invalid === 0) {
      if (data?.category) {
        data.category = categories?.find(
          (item) => item._id === data.category
        )?.title;
      }
      const finalPayload = { ...data, ...payload };
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.thumb) formData.append("thumb", finalPayload.thumb[0]);
      if (finalPayload.images) {
        for (let image of finalPayload.images) formData.append("images", image);
      }
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));

      const response = await apiCreateProduct(formData);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        reset();
        setPayload(null);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
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
        const fileBase64 = await getBase64(file);
        imagesArr.push(fileBase64);
      }
    }
    if (files.length > 0) {
      setPreview((prev) => ({ ...prev, images: imagesArr }));
    }
  };

  return (
    <div className="w-full">
      <h1 className="h-[75px] flex items-center text-3xl justify-between font-bold px-4 border-b">
        <span>Create Product</span>
      </h1>
      <div className="p-4 bg-[#ecf0f1] h-fit">
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <InputForm
            label={"Name Product"}
            fullWidth
            register={register}
            errors={errors}
            id="title"
            validate={{ required: "Field requied" }}
            placeholder="Name"
          />
          <div className="w-full flex my-6 gap-4">
            <InputForm
              label={"Price"}
              type="Number"
              register={register}
              errors={errors}
              id="price"
              validate={{ required: "Field requied" }}
              placeholder="Price"
              styles="flex-auto"
            />
            <InputForm
              label={"Quantity"}
              type="Number"
              register={register}
              errors={errors}
              id="quantity"
              validate={{ required: "Field requied" }}
              placeholder="Quantiry"
              styles="flex-auto"
            />

            <InputForm
              label={"Color"}
              register={register}
              errors={errors}
              id="color"
              validate={{ required: "Field requied" }}
              placeholder="color"
              styles="flex-auto"
            />
          </div>
          <div className="w-full flex my-6 gap-4">
            <SelectForm
              fullWidth
              label="Category"
              register={register}
              errors={errors}
              id="category"
              options={categories?.map((el) => ({
                code: el._id,
                value: el.title,
              }))}
              validate={{ required: "Field requied" }}
              styles="flex-auto"
            />
            <SelectForm
              fullWidth
              label="Brand"
              register={register}
              errors={errors}
              id="brand"
              options={categories
                ?.find((el) => el._id === watch("category"))
                ?.brand?.map((el) => ({ code: el, value: el }))}
              validate={{ required: "Field requied" }}
              styles="flex-auto"
            />
          </div>
          <Markdown
            label="Description"
            name="description"
            changeValue={changeValue}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <div className="mt-6">
            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="file">Choose file to upload Thumb</label>
              <input
                type="file"
                id="thumb"
                name="thumb"
                accept="image/png, image/jpeg"
                {...register("thumb", { required: "Need Field" })}
              />
              {errors["thumb"] && (
                <small className="text-xs text-red-500">
                  {errors["thumb"].message}
                </small>
              )}
            </div>
            {preview?.thumb && (
              <div className="thumb">
                <img
                  src={preview?.thumb}
                  alt="Thumbnail"
                  className="w-[200px] h-[200px] object-cover"
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
                {...register("images", { required: "Need Field" })}
              />
              {errors["images"] && (
                <small className="text-xs text-red-500">
                  {errors["images"].message}
                </small>
              )}
            </div>
            {preview?.images.length > 0 && (
              <div className="flex gap-2 my-4">
                {preview?.images.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    alt="Images"
                    className="w-[200px] h-[200px] object-cover"
                  />
                ))}
              </div>
            )}
          </div>
          <Button type="submit">Create product</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
