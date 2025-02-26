"use client";

import Button from "@/components/input/Button";
import DropdownInput from "@/components/input/DropdownInput";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Chart from "./Chart";
import { Slider } from "primereact/slider";
import useDebounce from "@/utils/useDebounce";

const SurveyReportChart = ({ chartData, onFilterChange, loadingGraphId }) => {
  const [filters, setFilters] = useState({
    age: "0-100",  
    gender: null,
    monthDuration: "",
  });
const [isFirstRender, setisFirstRender] = useState(true)
  const debouncedFilters = useDebounce(filters, 500);

  const triggerFilterChange = useCallback(() => {
    onFilterChange(debouncedFilters);
  }, [debouncedFilters, onFilterChange]);

  useEffect(() => {
    if (isFirstRender) {
      setisFirstRender(false)
      return;  
    } else {
      triggerFilterChange();
    }
  }, [debouncedFilters]);

  const handleAgeChange = (e) => {
    setFilters((prev) => ({ ...prev, age: `${e.value[0]}-${e.value[1]}` }));
  };

  const handleGenderChange = (e) => {
    setFilters((prev) => ({ ...prev, gender: e.value }));
  };

  const handleDurationChange = (duration) => {
    setFilters((prev) => ({ ...prev, monthDuration: duration }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="w-full md:w-1/5 space-y-3">
        <Button
          className={"rounded-lg w-full"}
          variant={"primary-outline"}
          onClick={() => {
            setFilters({ age: "18-100", gender: "", monthDuration: "" });
          }}
        >
          All adults
        </Button>
        <hr className="my-3" />
        <p>Age: {filters.age}</p>
        <div className="mx-2 pb-3">
          <Slider
            range
            min={0}
            max={100}
            value={filters.age.split("-").map(Number)}
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
          {["3", "6", "12", "60", ""].map((duration) => (
            <button
              key={duration}
              className={`border px-2 ${
                filters.monthDuration === duration
                  ? "text-primary border-primary"
                  : "text-[#6B7280]"
              } rounded-md`}
              onClick={() => handleDurationChange(duration)}
            >
              {duration === ""
                ? "All"
                : duration === "60"
                ? "5YRS"
                : `${duration}M`}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full md:w-4/5 bg-[#F9FAFB] rounded-xl p-2 md:px-5 md:py-7">
        <Chart chartData={chartData} isLoading={loadingGraphId === chartData._id}/>
      </div>
    </div>
  );
};

export default SurveyReportChart;
