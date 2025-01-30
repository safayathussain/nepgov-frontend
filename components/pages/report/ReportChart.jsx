import Button from "@/components/input/Button";
import DropdownInput from "@/components/input/DropdownInput";
import React from "react";
import Chart from "./Chart";

const ReportChart = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="w-full md:w-1/5 space-y-3">
        <Button className={"rounded-lg w-full"} variant={"primary-outline"}>
          All adults
        </Button>
        <hr className="my-3" />
        <DropdownInput placeholder={"Age"} />
        <DropdownInput placeholder={"Gender"} />
        <DropdownInput placeholder={"Politics"} />
        <DropdownInput placeholder={"Region"} />
        <DropdownInput placeholder={"Social Grades"} />
        <hr className="my-3" />
        <div className="flex gap-2 flex-wrap">
          <button className="border px-2 text-[#6B7280] rounded-md">3M</button>
          <button className="border px-2 text-[#6B7280] rounded-md">6M</button>
          <button className="border px-2 text-[#6B7280] rounded-md">1YR</button>
          <button className="border px-2 text-[#6B7280] rounded-md">
            5YRS
          </button>
          <button className="border px-2 text-primary border-primary rounded-md">
            All
          </button>
        </div>
      </div>
      <div className="w-full md:w-4/5 bg-[#F9FAFB] rounded-xl p-2 md:px-5 md:py-7">
        <Chart />
      </div>
    </div>
  );
};

export default ReportChart;
