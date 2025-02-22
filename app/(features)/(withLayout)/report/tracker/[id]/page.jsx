"use client";
import CheckInput from "@/components/input/CheckInput";
import ReportChart from "@/components/pages/report/ReportChart";
import { FetchApi } from "@/utils/FetchApi";
import { useAuth } from "@/utils/functions";
import useDebounce from "@/utils/useDebounce";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const {auth} = useAuth()
  const [filters, setFilters] = useState({
    age: searchParams.get("age") || "",
    gender: searchParams.get("gender") || null,
    monthDuration: searchParams.get("monthDuration") || "",
  });
  const debouncedFilters = useDebounce(filters, 500);
  useEffect(() => {
    const fetchTrackerData = async () => {
      try {
        setIsLoading(true);
        const queryString = new URLSearchParams(filters).toString();
        const { data } = await FetchApi({
          url: `/tracker/result/${id}?${queryString}`,
        });
        if (!selectedOption && auth._id) {
          const { data: checkVote } = await FetchApi({
            url: `/tracker/checkVote/${id}`,
          });
          setSelectedOption(checkVote?.data?.option);
        }
        setChartData(data?.data);
      } catch (err) {
        console.error("Error fetching tracker data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrackerData();
  }, [id, debouncedFilters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div className="container">
      <style>
        {`
          .p-highlight > .p-checkbox-box {
            background-color: #3560AD !important;
            border-radius: 999px !important; 
          }
        `}
      </style>
      <div className="container border border-lightGray rounded-xl py-10 my-10">
        <p className="text-center text-xl sm:text-2xl lg:text-4xl font-semibold max-w-[700px] mx-auto">
          {chartData?.topic}
        </p>
        <div className="py-10 max-w-[700px] mx-auto space-y-2">
          {chartData?.options?.map((item, i) => (
            <div
              key={i}
              className="bg-[#F3F4F6] p-4 rounded-lg flex justify-between items-center flex-wrap flex-col gap-2 md:flex-row"
            >
              <div className="">
                <CheckInput
                  checked={item?._id === selectedOption}
                  boxClassName={"!outline-primary"}
                  label={item?.content}
                />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-[150px] md:w-[300px] h-1 bg-gray-200 relative">
                  <div
                    className="h-1 bg-primary"
                    style={{ width: item?.percentage + "%" }}
                  ></div>
                </div>
                <span>{item?.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
        <ReportChart
          chartData={chartData}
          filters={filters}
          isLoading={isLoading}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default Page;
