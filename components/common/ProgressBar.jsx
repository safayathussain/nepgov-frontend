import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-1 bg-gray-300 rounded overflow-hidden">
      <div
        className="h-1 bg-primary transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
