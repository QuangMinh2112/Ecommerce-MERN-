import React, { useCallback, useEffect, useState } from "react";
import { Button, InputField, withBaseLogic } from "../../components";
import {
  apiFinalRegister,
  apiForgotPassword,
  apiLoginUser,
  apiRegisterUser,
} from "../../apis";
import Swal from "sweetalert2";
import { path } from "../../utils";
import { NavLink, useSearchParams } from "react-router-dom";
import { login } from "../../redux/user/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validate } from "../../utils/helper";
import { showModal } from "redux/app/appSlice";
import Loading from "components/Loading";

const Login = ({ navigate, dispatch }) => {
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
  });
  const resetPayload = () => {
    setPayload({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobile: "",
    });
  };
  const [isRegister, setIsRegister] = useState(false);
  const [isVerifyEmail, setIsVerifyEmail] = useState(false);
  const [isForcusPassword, setIsForcusPassword] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [emailForcusPassword, setEmailForcusPassword] = useState("");
  const [token, setToken] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    resetPayload();
  }, [isRegister]);
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { firstName, lastName, mobile, ...data } = payload;
      const invalid = isRegister
        ? validate(payload, setInvalidFields)
        : validate(data, setInvalidFields);
      if (invalid === 0) {
        if (isRegister) {
          dispatch(
            showModal({ isShowModal: true, modalChildren: <Loading /> })
          );
          const resRegister = await apiRegisterUser(payload);
          dispatch(showModal({ isShowModal: false, modalChildren: null }));
          if (resRegister.success) {
            setIsVerifyEmail(true);
            // Swal.fire("Congratulation", resRegister.message, "success").then(
            //   () => {
            //     setIsRegister(false);
            //     resetPayload();
            //   }
            // );
          } else {
            Swal.fire("Oops!", resRegister.message, "error");
          }
        } else {
          const resLogin = await apiLoginUser(data);
          if (resLogin.success) {
            dispatch(
              login({
                isLogin: true,
                userData: resLogin.message,
                token: resLogin.accessToken,
              })
            );
            // navigate(`/${path.HOME}`);

            searchParams?.get("redirect")
              ? navigate(searchParams.get("redirect"))
              : navigate(`/${path.HOME}`);
          } else {
            Swal.fire("Oops!", resLogin.message, "error");
          }
        }
      }
    },
    [payload, isRegister, navigate, dispatch]
  );
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email: emailForcusPassword });
    if (!response.success) {
      toast.info(response.message);
      setIsForcusPassword(true);
    } else {
      toast.success(response.message);
    }
  };

  const finalRegister = async () => {
    const response = await apiFinalRegister(token);
    if (response.success) {
      Swal.fire("Congratulation", response.message, "success").then(() => {
        setIsRegister(false);
        resetPayload();
      });
    } else {
      Swal.fire("Oops!", response.message, "error");
    }
    setIsVerifyEmail(false);
    setToken("");
  };
  return (
    <div className="w-full h-screen responsive">
      {isVerifyEmail && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-overlay z-50 flex flex-col justify-center items-center"
          onClick={() => setIsVerifyEmail(false)}
        >
          <div
            className="w-[500px] bg-white rounded-md p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>
              We send a code to your mail. Please check your email and enter
              your code here !
            </h4>
            <div className="w-full flex justify-between">
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="p-2 border rounded-md outline-none w-[300px]"
              />
              <button
                onClick={finalRegister}
                className="px-4 py-2 bg-blue-500 font-semibold text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {isForcusPassword && (
        <div className="absolute inset-0 flex justify-center py-8 z-50 bg-overlay">
          <div className="min-w-[500px] h-fit bg-white p-7  rounded-md  animate-slide-bottom">
            <label htmlFor="">Email address:</label>
            <input
              type="email"
              value={emailForcusPassword}
              placeholder="Ex:abc@gmail.com"
              onChange={(e) => setEmailForcusPassword(e.target.value)}
              className="px-4 py-2 rounded-sm w-full my-2 border outline-none bg-white"
            />
            <div className="flex justify-between">
              <Button
                style="bg-blue px-4 py-2 rounded-md text-white bg-[#0080ff] font-semibold my-2"
                handleOnClick={handleForgotPassword}
              >
                Send
              </Button>
              <Button
                style="bg-blue px-4 py-2 rounded-md text-white bg-main font-semibold my-2"
                handleOnClick={() => setIsForcusPassword(false)}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      )}
      <img
        src="https://img.freepik.com/premium-vector/online-shopping-digital-technology-with-icon-blue-background-ecommerce-online-store-marketing_252172-219.jpg?w=2000"
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <div className="p-8 bg-white rounded-md min-w-[500px] ">
          <form onSubmit={handleSubmit}>
            <h1 className="text-[28px] text-center font-semibold text-main uppercase mb-5">
              {isRegister ? "Register" : "Login"}
            </h1>
            {isRegister && (
              <div className="flex items-center gap-2">
                <InputField
                  value={payload.firstName}
                  setValue={setPayload}
                  nameKey="firstName"
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                />
                <InputField
                  value={payload.lastName}
                  setValue={setPayload}
                  nameKey="lastName"
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                />
              </div>
            )}
            {isRegister && (
              <InputField
                value={payload.mobile}
                setValue={setPayload}
                nameKey="mobile"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            )}
            <InputField
              value={payload.email}
              setValue={setPayload}
              nameKey="email"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />

            <InputField
              value={payload.password}
              setValue={setPayload}
              nameKey="password"
              type="password"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
            <Button type="submit" fw>
              {isRegister ? "Register" : "Login"}
            </Button>
            <div
              className={`flex items-center w-full text-sm ${
                isRegister ? "justify-center" : "justify-between"
              }`}
            >
              {!isRegister && (
                <span
                  onClick={() => setIsForcusPassword(true)}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  Forgot your password?
                </span>
              )}
              {isRegister ? (
                <span>
                  Already have an account.?
                  <span
                    className="text-blue-500 hover:underline cursor-pointer"
                    onClick={() => setIsRegister(false)}
                  >
                    Login Now
                  </span>
                </span>
              ) : (
                <span
                  className="text-blue-500 hover:underline cursor-pointer"
                  onClick={() => setIsRegister(true)}
                >
                  Create Account
                </span>
              )}
            </div>
            {/* <NavLink className="text-center block" to={`/${path.HOME}`}>
              Home
            </NavLink> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default withBaseLogic(Login);
