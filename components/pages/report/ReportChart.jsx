import Button from "@/components/input/Button";
import DropdownInput from "@/components/input/DropdownInput";
import React from "react";
import Chart from "./Chart";
import { Slider } from "primereact/slider";

const ReportChart = ({ chartData, filters, onFilterChange, isLoading }) => {
  const handleAgeChange = (e) => {
    onFilterChange("age", `${e.value[0]}-${e.value[1]}`);
  };

  const handleGenderChange = (e) => {
    onFilterChange("gender", e.value);
  };

  const handleDurationChange = (duration) => {
    onFilterChange("monthDuration", duration);
  };

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="w-full md:w-1/5 space-y-3">
        <Button
          className={"rounded-lg w-full"}
          variant={"primary-outline"}
          onClick={() => {
            onFilterChange("age", "");
            onFilterChange("gender", "");
          }}
        >
          All adults
        </Button>
        <hr className="my-3" />
        <p>Age: {filters?.age}</p>
        <div className="mx-2 pb-3">
          <Slider
            range
            min={0}
            max={100}
            value={filters.age ? filters.age.split("-").map(Number) : [0, 100]}
            onChange={handleAgeChange}
          />
        </div>
        <DropdownInput
          placeholder={"Gender"}
          value={filters.gender}
          onChange={handleGenderChange}
          options={[
            { name: "All", value: "" },
            { name: "Male", value: "male" },
            { name: "Female", value: "female" },
            { name: "Other", value: "other" },
          ]}
        />
        <hr className="my-3" />
        <div className="flex gap-2 flex-wrap">
          <button
            className={`border px-2 ${
              filters.monthDuration === "3"
                ? "text-primary border-primary"
                : "text-[#6B7280]"
            } rounded-md`}
            onClick={() => handleDurationChange("3")}
          >
            3M
          </button>
          <button
            className={`border px-2 ${
              filters.monthDuration === "6"
                ? "text-primary border-primary"
                : "text-[#6B7280]"
            } rounded-md`}
            onClick={() => handleDurationChange("6")}
          >
            6M
          </button>
          <button
            className={`border px-2 ${
              filters.monthDuration === "12"
                ? "text-primary border-primary"
                : "text-[#6B7280]"
            } rounded-md`}
            onClick={() => handleDurationChange("12")}
          >
            1YR
          </button>
          <button
            className={`border px-2 ${
              filters.monthDuration === "60"
                ? "text-primary border-primary"
                : "text-[#6B7280]"
            } rounded-md`}
            onClick={() => handleDurationChange("60")}
          >
            5YRS
          </button>
          <button
            className={`border px-2 ${
              !filters.monthDuration
                ? "text-primary border-primary"
                : "text-[#6B7280]"
            } rounded-md`}
            onClick={() => handleDurationChange("")}
          >
            All
          </button>
        </div>
      </div>
      <div className="w-full md:w-4/5 bg-[#F9FAFB] rounded-xl p-2 md:px-5 md:py-7">
        <Chart chartData={chartData} isLoading={isLoading}/>
      </div>
    </div>
  );
};

export default ReportChart;
