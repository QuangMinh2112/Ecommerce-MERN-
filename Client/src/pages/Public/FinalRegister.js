import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { path } from "../../utils";
import Swal from "sweetalert2";
import { withBaseLogic } from "components";

const FinalRegister = ({ navigate }) => {
  const { status } = useParams();

  useEffect(() => {
    if (status === "failed") {
      Swal.fire("Oop!", "Đăng ký không thành công !", "error").then(() => {
        navigate(`/${path.LOGIN}`);
      });
    }
    if (status === "success") {
      Swal.fire("Congratulation !", "Đăng ký thành công !", "success").then(
        () => {
          navigate(`/${path.LOGIN}`);
        }
      );
    }
  }, [status, navigate]);

  return <div className="h-screen w-screen bg-white"></div>;
};

export default withBaseLogic(FinalRegister);
