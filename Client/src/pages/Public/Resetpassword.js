import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components";
import { path } from "../../utils";
import { apiResetPassword } from "../../apis";
import Swal from "sweetalert2";

const Resetpassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const response = await apiResetPassword({ password, token });
    if (response.success) {
      Swal.fire("Congratulation", response.message, "success").then(() => {
        navigate(`/${path.LOGIN}`);
      });
    } else {
      Swal.fire("Oops!", response.message, "error");
    }
  };

  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center py-8 z-50 bg-overlay">
        <div className="min-w-[500px] h-fit bg-white p-7  rounded-md  animate-slide-bottom">
          <label htmlFor="">New Password</label>
          <input
            type="password"
            placeholder="Newpassword here..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-sm w-full my-2 border outline-none bg-white"
          />
          <div className="flex justify-between">
            <Button
              name="Update"
              style="bg-blue px-4 py-2 rounded-md text-white bg-[#0080ff] font-semibold my-2"
              handleOnClick={handleSubmit}
            />
            <Button
              name="Back"
              style="bg-blue px-4 py-2 rounded-md text-white bg-main font-semibold my-2"
              handleOnClick={() => navigate(`/${path.LOGIN}`)}
            />
          </div>
        </div>
      </div>
      <img
        src="https://img.freepik.com/premium-vector/online-shopping-digital-technology-with-icon-blue-background-ecommerce-online-store-marketing_252172-219.jpg?w=2000"
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Resetpassword;
