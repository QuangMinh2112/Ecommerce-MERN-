import { apiUpdateCurrentUser } from "apis";
import { Button, InputForm } from "components";
import moment from "moment";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCurrentUser } from "redux/user/userAction";

const Personal = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
  } = useForm();
  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    reset({
      firstName: current?.firstName,
      lastName: current?.lastName,
      mobile: current?.mobile,
      email: current?.email,
      avatar: current?.avatar,
    });
  }, [current]);

  const handleUpdateInfo = async (data) => {
    const formData = new FormData();
    if (data.avatar.length > 0) formData.append("avatar", data.avatar[0]);
    delete data.avatar;

    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    const response = await apiUpdateCurrentUser(formData);
    if (response.success) {
      dispatch(getCurrentUser());
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full">
      <header className="text-3xl font-semibold p-4 border-b border-b-blue-200">
        Personal
      </header>
      <div className="w-3/5 mx-auto py-8">
        <form onSubmit={handleSubmit(handleUpdateInfo)}>
          <InputForm
            label={"FirstName"}
            register={register}
            errors={errors}
            id="firstName"
            validate={{ required: "Field requied" }}
          />
          <InputForm
            label={"LastName"}
            register={register}
            errors={errors}
            id="lastName"
            validate={{ required: "Field requied" }}
          />
          <InputForm
            label={"Email"}
            register={register}
            errors={errors}
            id="email"
            validate={{ required: "Field requied" }}
          />
          <InputForm
            label={"Phone"}
            register={register}
            errors={errors}
            id="mobile"
            validate={{
              required: "Field requied",
              pattern: {
                value:
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                message: "Phone Inavalid",
              },
            }}
          />
          <div className="flex items-center gap-2 mt-3">
            <span>Account Status:</span>
            <span>{current?.isBlocked ? "Blocked" : "Active"}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span>Role:</span>
            <span>{current?.role === 2 ? "User" : "Admin"}</span>
          </div>
          <div className="flex items-center gap-2 my-2">
            <span>Create At:</span>
            <span>{moment(current?.createdAt).fromNow()}</span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="file">
              <span> Profile Images:</span>
              <img
                src={
                  current?.avatar ||
                  "https://img.freepik.com/free-icon/user_318-159711.jpg"
                }
                alt="avatar"
                className="w-20 h-20 object-cover cursor-pointer rounded-full"
              />
              <input type="file" id="file" {...register("avatar")} hidden />
            </label>
          </div>
          <div className="flex justify-end">
            {isDirty && <Button type="submit">Update Information</Button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Personal;
