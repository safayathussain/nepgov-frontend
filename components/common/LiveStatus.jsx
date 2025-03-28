import React from "react";
import { GoDotFill } from "react-icons/go";

const LiveStatus = () => {
  return (
    <div>
      {" "}
      <p className="flex items-center blink ">
        Live <GoDotFill className="text-error text-2xl" />
      </p>
    </div>
  );
};

export default LiveStatus;
