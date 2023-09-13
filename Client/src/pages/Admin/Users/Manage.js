import { apiDeleteUser, apiGetAllUser, apiUpdateUserByAdmin } from "apis";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { icons } from "utils";
import { roles, status } from "utils/constants";
import {
  Button,
  InputField,
  InputForm,
  Pagination,
  SelectForm,
} from "components";
import useDebounce from "hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import clsx from "clsx";

const { AiFillDelete, AiFillEdit, BsDot, MdOutlineKeyboardReturn } = icons;

const Manage = () => {
  const [params] = useSearchParams();
  const [userData, setUserData] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [update, setUpdate] = useState(false);
  const [queries, setQueries] = useState({
    q: "",
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    mobile: "",
    isBlocked: "",
  });
  const fecthAllUsers = async (params) => {
    const res = await apiGetAllUser({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (res.success) {
      setUserData(res);
    }
  };
  const queriesDebounce = useDebounce(queries.q, 800);
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriesDebounce) queries.q = queriesDebounce;
    fecthAllUsers(queries);
  }, [queriesDebounce, params, update]);

  //handle

  const handleDeleteUser = async (userId) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You want to delete this user ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await apiDeleteUser(userId);
        if (res.success) {
          Swal.fire("Deleted!", res.message, "success");
          render();
        }
      }
    });
  };

  const render = () => {
    setUpdate(!update);
  };

  const handleUpdate = async (data) => {
    const response = await apiUpdateUserByAdmin(data, editUser._id);
    if (response.success) {
      toast.success(response.message);
      render();
      setEditUser(null);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className={clsx("w-full", editUser && "pl-16")}>
      <h1 className="h-[75px] flex items-center text-3xl justify-between font-bold px-4 border-b">
        <span>Manage User</span>
      </h1>
      <div className="w-full p-4">
        <div className="flex justify-end py-4">
          <InputField
            nameKey={"q"}
            isHideLabel
            value={queries.q}
            setValue={setQueries}
            style={"w-500"}
            placeholder="Search name user"
          />
        </div>

        <form onSubmit={handleSubmit(handleUpdate)}>
          {editUser && <Button type="submit">Update</Button>}
          <table className="table-auto mb-6 text-left w-full">
            <thead className="font-bold bg-gray-600 text-[13px] border border-gray-500 text-white">
              <tr className="border border-gray-500">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">FirstName</th>
                <th className="px-4 py-2">LastName</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">CreatedAt</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData?.users?.map((item, index) => (
                  <tr className="border border-gray-500" key={item._id}>
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">
                      {editUser?._id === item._id ? (
                        <InputForm
                          fullWidth
                          defaultValue={editUser?.email}
                          register={register}
                          errors={errors}
                          id="email"
                          validate={{
                            required: "Field requied",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "invalid email address",
                            },
                          }}
                        />
                      ) : (
                        <span>{item?.email}</span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editUser?._id === item._id ? (
                        <InputForm
                          fullWidth
                          defaultValue={editUser?.firstName}
                          register={register}
                          errors={errors}
                          id="firstName"
                          validate={{ required: "Field requied" }}
                        />
                      ) : (
                        <span>{item?.firstName}</span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editUser?._id === item._id ? (
                        <InputForm
                          fullWidth
                          defaultValue={editUser?.lastName}
                          register={register}
                          errors={errors}
                          id="lastName"
                          validate={{ required: "Field requied" }}
                        />
                      ) : (
                        <span>{item?.lastName}</span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editUser?._id === item._id ? (
                        <SelectForm
                          register={register}
                          errors={errors}
                          id="role"
                          validate={{ required: "Field requied" }}
                          options={roles}
                          defaultValue={editUser?.role}
                          fullWidth
                        />
                      ) : (
                        <span className="font-[700]">
                          {roles?.find((el) => +el.code === +item.role)?.value}
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editUser?._id === item._id ? (
                        <InputForm
                          fullWidth
                          defaultValue={editUser?.mobile}
                          register={register}
                          errors={errors}
                          id={"mobile"}
                          validate={{ required: "Field requied" }}
                        />
                      ) : (
                        <span>{item?.mobile}</span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      <span>
                        {moment(item?.createdAt).format("DD/MM/YYYY")}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      {editUser?._id === item?._id ? (
                        <SelectForm
                          fullWidth
                          defaultValue={item?.isBlocked}
                          register={register}
                          errors={errors}
                          options={status}
                          id={"isBlocked"}
                          validate={{ required: "Field requied" }}
                        />
                      ) : (
                        <span>
                          {item?.isBlocked ? (
                            <span className="text-[#e74c3c] flex items-center">
                              Blocked
                            </span>
                          ) : (
                            <span className="text-[#1abc9c] flex items-center">
                              <BsDot size="40" />
                              Active
                            </span>
                          )}
                        </span>
                      )}
                    </td>
                    <td className="flex gap-2 py-2 px-4">
                      {editUser?._id === item._id ? (
                        <span
                          className="px-2 flex items-center gap-1 text-white p-1 rounded-md bg-[#000] bg- text-orange hover:bg-[#3c3c3c] cursor-pointer"
                          title="Back"
                          onClick={() => setEditUser(null)}
                        >
                          <span>
                            <MdOutlineKeyboardReturn />
                          </span>
                        </span>
                      ) : (
                        <span
                          className="px-2 flex items-center gap-1 text-white p-1 rounded-md bg-[#1abc9c] bg- text-orange hover:bg-[#76e694] cursor-pointer"
                          title="Edit"
                          onClick={() => setEditUser(item)}
                        >
                          <span>
                            <AiFillEdit />
                          </span>
                        </span>
                      )}
                      <span
                        className="px-2 flex items-center gap-1 text-white p-1 rounded-md bg-[#e74c3c] text-orange hover:bg-red-400 cursor-pointer"
                        title="Delete"
                        onClick={() => handleDeleteUser(item._id)}
                      >
                        <span>
                          <AiFillDelete />
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </form>
        <div className="w-full flex justify-end mt-4">
          <Pagination totalCount={userData?.counts} />
        </div>
      </div>
    </div>
  );
};

export default Manage;
