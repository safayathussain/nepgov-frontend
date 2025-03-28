"use client";
import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import Button from "@/components/input/Button";
import DropdownInput from "@/components/input/DropdownInput";
import Chart from "./Chart";
import { Slider } from "primereact/slider";
import { generateChartDurationArray, useCountries } from "@/utils/functions";
import { useChartDataDownload } from "@/utils/useChartDataDownload";
import { TbDownload } from "react-icons/tb";
import ShareButtons from "@/components/common/ShareButtons";
import TrackerChartPdfTamplate from "./TrackerChartPdfTamplate";

const TrackerReportChart = ({
  chartData,
  filters,
  isLoading,
  onApplyFilters,
  liveEndedAt,
  liveStartedAt,
  id,
}) => {
  const { countries } = useCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isStatesLoading, setIsStatesLoading] = useState(false);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);
  const [localFilters, setLocalFilters] = useState({});

  // Sync local filters when parent filters change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Memoize filter handlers to prevent unnecessary re-renders
  const handleAgeChange = useCallback((e) => {
    setLocalFilters((prev) => ({
      ...prev,
      age: `${e.value[0]}-${e.value[1]}`,
    }));
  }, []);

  const handleGenderChange = useCallback((e) => {
    setLocalFilters((prev) => ({ ...prev, gender: e.value }));
  }, []);

  const handleDurationChange = useCallback((duration) => {
    setLocalFilters((prev) => ({ ...prev, monthDuration: duration }));
  }, []);

  const handleLocationChange = useCallback((e) => {
    const { name, value } = e.target;

    // Clear dependent fields when parent field changes
    if (name === "country") {
      setLocalFilters((prev) => ({
        ...prev,
        [name]: value,
        state_province: "",
        city: "",
      }));
    } else if (name === "state_province") {
      setLocalFilters((prev) => ({
        ...prev,
        [name]: value,
        city: "",
      }));
    } else {
      setLocalFilters((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  // Apply all filters at once
  const applyFilters = useCallback(() => {
    if (onApplyFilters) {
      onApplyFilters(localFilters);
    }
  }, [localFilters, onApplyFilters]);

  // Reset all filters
  const resetAllFilters = useCallback(() => {
    const resetFilters = {
      age: "0-100",
      gender: "",
      country: "",
      state_province: "",
      city: "",
      monthDuration: "",
    };

    setLocalFilters(resetFilters);

    if (onApplyFilters) {
      onApplyFilters(resetFilters);
    }
  }, [onApplyFilters]);

  // Load states when country changes - with proper error handling
  useEffect(() => {
    const loadStates = async () => {
      if (!localFilters.country) {
        setStates([]);
        return;
      }

      setIsStatesLoading(true);
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              country: localFilters.country,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { data } = await response.json();
        if (data?.states) {
          setStates(
            data.states.map((item) => ({
              name: item.name,
              value: item.name,
            }))
          );
        }
      } catch (error) {
        console.error("Error loading states:", error);
        setStates([]);
      } finally {
        setIsStatesLoading(false);
      }
    };

    loadStates();
  }, [localFilters.country]);

  // Load cities when state changes - with proper error handling
  useEffect(() => {
    const loadCities = async () => {
      if (!localFilters.country || !localFilters.state_province) {
        setCities([]);
        return;
      }

      setIsCitiesLoading(true);
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              country: localFilters.country,
              state: localFilters.state_province,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { data } = await response.json();
        if (data) {
          setCities([
            ...data.map((city) => ({
              name: city,
              value: city,
            })),
            { name: "Other", value: "Other" },
          ]);
        }
      } catch (error) {
        console.error("Error loading cities:", error);
        setCities([]);
      } finally {
        setIsCitiesLoading(false);
      }
    };

    loadCities();
  }, [localFilters.country, localFilters.state_province]);

  // Parse age range from string
  const ageRange = useMemo(() => {
    return localFilters.age
      ? localFilters.age.split("-").map(Number)
      : [0, 100];
  }, [localFilters.age]);

  // Memoize country options
  const countryOptions = useMemo(() => {
    return [
      { name: "All Countries", value: "" },
      ...countries.map((item) => ({ name: item.name, value: item.name })),
    ];
  }, [countries]);
  const { downloadChartDataAsCSV, downloadChartDataAsPdf } = useChartDataDownload();
const chartRef = useRef();
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="w-full md:w-1/5 space-y-3">
        <Button
          className="rounded-lg w-full"
          variant="primary-outline"
          onClick={resetAllFilters}
        >
          Reset all filters
        </Button>
        <hr className="my-3" />
        <p>Age: {localFilters?.age}</p>
        <div className="mx-2 pb-3">
          <Slider
            range
            min={0}
            max={100}
            value={ageRange}
            onChange={handleAgeChange}
          />
        </div>
        <DropdownInput
          placeholder="Gender"
          value={localFilters.gender}
          onChange={handleGenderChange}
          options={[
            { name: "All", value: "" },
            { name: "Male", value: "male" },
            { name: "Female", value: "female" },
            { name: "Other", value: "other" },
          ]}
        />
        <hr className="my-3" />

        {/* Location Filters */}
        <p className="font-medium">Location</p>
        <DropdownInput
          filter
          placeholder="Country"
          name="country"
          value={localFilters.country || ""}
          onChange={handleLocationChange}
          options={countryOptions}
        />
        <DropdownInput
          filter
          placeholder="State/Province"
          name="state_province"
          value={localFilters.state_province || ""}
          onChange={handleLocationChange}
          options={[{ name: "All States", value: "" }, ...states]}
          disabled={!localFilters.country}
          loading={isStatesLoading}
        />
        <DropdownInput
          filter
          placeholder="City"
          name="city"
          value={localFilters.city || ""}
          onChange={handleLocationChange}
          options={[{ name: "All Cities", value: "" }, ...cities]}
          disabled={!localFilters.state_province}
          loading={isCitiesLoading}
        />

        <hr className="my-3" />
        <p className="font-medium">Time Period</p>
        <div className="flex gap-2 flex-wrap">
          {generateChartDurationArray(liveStartedAt, liveEndedAt).map(
            (period) => (
              <button
                key={period.label}
                className={`border px-2 ${
                  localFilters.monthDuration === period.value
                    ? "text-primary border-primary"
                    : "text-[#6B7280]"
                } rounded-md`}
                onClick={() => handleDurationChange(period.value)}
                type="button"
              >
                {period.label}
              </button>
            )
          )}
        </div>

        {/* Apply Filters Button */}
        <Button
          className="rounded-lg w-full mt-5"
          variant="primary"
          onClick={applyFilters}
        >
          Apply Filters
        </Button>
      </div>
      <div className="w-full md:w-4/5 bg-[#F9FAFB] rounded-xl p-2 md:px-5 md:py-7">
        <Chart chartData={chartData} isLoading={isLoading} />
        <div className="mt-5 md:px-5 flex justify-between flex-wrap">
          <div className="flex gap-2 items-center">
            <p>Download as:</p>
            <button
              className="flex items-center   "
              onClick={() =>
                downloadChartDataAsCSV(chartData, `tracker_${id}.csv`)
              }
            >
              Csv <TbDownload size={20} />
            </button>
            <button
              className="flex items-center   "
              onClick={() =>
                downloadChartDataAsPdf(chartRef, `tracker_${id}.pdf`)
              }
            >
              Pdf <TbDownload size={20} />
            </button>
          </div>
          <ShareButtons />
        </div>
      </div>
      {/* <div className="hidden">
        <TrackerChartPdfTamplate data={chartData} ref={chartRef}/>
      </div> */}
    </div>
  );
};

export default TrackerReportChart;
