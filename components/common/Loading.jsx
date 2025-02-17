import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full flex items-center justify-center h-full">
      <ClipLoader size={80}/>
    </div>
  );
};

export default Loading;
