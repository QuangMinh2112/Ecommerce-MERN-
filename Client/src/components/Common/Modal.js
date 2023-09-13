import React, { memo } from "react";

import { showModal } from "../../redux/app/appSlice";
import withBaseLogic from "components/Hoc/withBaseLogic";

function Modal({ children, dispatch }) {
  return (
    <div
      onClick={() =>
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
      }
      className="absolute inset-0 z-50 bg-overlay flex items-center justify-center  "
    >
      {children}
    </div>
  );
}
export default withBaseLogic(memo(Modal));
