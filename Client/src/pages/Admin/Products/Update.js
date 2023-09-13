import { useForm } from "react-hook-form";
import { Button, InputForm, SelectForm } from "components";
import Markdown from "components/Inputs/Markdown";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBase64, validate } from "utils/helper";
import { toast } from "react-toastify";
import { showModal } from "redux/app/appSlice";
import Loading from "components/Loading";
import { apiUpdateProduct } from "apis";

const UpdateProduct = ({ editProduct, render, setEditProduct }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();
  const { categories } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    description: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  useEffect(() => {
    reset({
      title: editProduct?.title || "",
      price: editProduct?.price || "",
      quantity: editProduct?.quantity || "",
      color: editProduct?.color || "",
      category: editProduct?.category || "",
      brand: editProduct?.brand.toLowerCase() || "",
    });
    setPreview({
      thumb: editProduct?.thumb || null,
      images: editProduct?.images,
    });
    setPayload({
      description:
        typeof editProduct?.description === "object"
          ? editProduct?.description.join(", ")
          : editProduct?.description,
    });
  }, [editProduct]);

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

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );
  const handleUpdateProduct = async (data) => {
    const invalid = validate(payload, setInvalidFields);
    if (invalid === 0) {
      if (data?.category) {
        data.category = categories?.find(
          (item) => item.title === data.category
        )?.title;
      }
      const finalPayload = { ...data, ...payload };
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.thumb)
        formData.append(
          "thumb",
          finalPayload?.thumb?.length === 0
            ? preview.thumb
            : finalPayload.thumb[0]
        );
      if (finalPayload.images) {
        const images =
          finalPayload?.images?.length === 0
            ? preview.images
            : finalPayload.images;
        for (let image of images) formData.append("images", image);
      }
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiUpdateProduct(formData, editProduct._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        render();
        setEditProduct(null);
        setPayload(null);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    }
  };
  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[69px]"></div>
      <div className="p-4 border-b bg-gray-100 flex justify-between items-center right-0 left-[270px] fixed z-1">
        <h1 className="text-3xl font-bold tracking-tight">Update Product</h1>
        <span
          className=" hover:underline hover:text-red-400 cursor-pointer"
          onClick={() => setEditProduct(null)}
        >
          Cancle
        </span>
      </div>
      <div className=" bg-[#ecf0f1] pl-4 h-fit">
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <InputForm
            label={"Name Product"}
            fullWidth
            register={register}
            errors={errors}
            id="title"
            placeholder="Name"
          />
          <div className="w-full flex my-6 gap-4">
            <InputForm
              label={"Price"}
              type="Number"
              register={register}
              errors={errors}
              id="price"
              placeholder="Price"
              styles="flex-auto"
            />
            <InputForm
              label={"Quantity"}
              type="Number"
              register={register}
              errors={errors}
              id="quantity"
              placeholder="Quantiry"
              styles="flex-auto"
            />

            <InputForm
              label={"Color"}
              register={register}
              errors={errors}
              id="color"
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
                code: el.title,
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
                ?.find((el) => el.title === watch("category"))
                ?.brand?.map((el) => ({
                  code: el.toLowerCase(),
                  value: el.toLowerCase(),
                }))}
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
            value={payload?.description}
          />
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
          <Button type="submit">Update product</Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
