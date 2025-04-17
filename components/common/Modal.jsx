import React, { useRef } from "react";
import { CgClose } from "react-icons/cg";

const Modal = ({ children, className, setOpen = () => {} }) => {
  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-black z-10 bg-opacity-20`}
      >
        <div className="flex items-center justify-center h-full">
          <div
            className={` bg-white rounded-xl m-3 p-5 space-y-3 relative max-w-[700px] ${className}`}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 text-xl"
            >
              <CgClose />
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
