import React from "react";
const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-1 bg-gray-300 ">
      <div
        className="h-1 bg-primary"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
