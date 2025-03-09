"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Button from "@/components/input/Button"
import DropdownInput from "@/components/input/DropdownInput"
import Chart from "./Chart"
import { Slider } from "primereact/slider"
import { generateChartDurationArray, useCountries } from "@/utils/functions"

const SurveyReportChart = ({ chartData, onFilterChange, loadingGraphId, liveStartedAt, liveEndedAt }) => {
  const { countries } = useCountries()
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [isStatesLoading, setIsStatesLoading] = useState(false)
  const [isCitiesLoading, setIsCitiesLoading] = useState(false)
  const [filters, setFilters] = useState({
    age: "0-100",
    gender: "",
    monthDuration: "",
    country: "",
    state_province: "",
    city: "",
  })
console.log(liveStartedAt, liveEndedAt)
  const handleInputChange = useCallback((name, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [name]: value }

      // Clear dependent fields
      if (name === "country") {
        newFilters.state_province = ""
        newFilters.city = ""
      } else if (name === "state_province") {
        newFilters.city = ""
      }

      return newFilters
    })
  }, [])

  const handleAgeChange = useCallback(
    (e) => {
      handleInputChange("age", `${e.value[0]}-${e.value[1]}`)
    },
    [handleInputChange],
  )

  const applyFilters = useCallback(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  // Load states when country changes
  useEffect(() => {
    const loadStates = async () => {
      if (!filters.country) {
        setStates([])
        return
      }

      setIsStatesLoading(true)
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: filters.country }),
        })
        const { data } = await response.json()
        if (data?.states) {
          setStates(data.states.map((item) => ({ ...item, value: item.name })))
        }
      } catch (error) {
        console.error("Error loading states:", error)
        setStates([])
      } finally {
        setIsStatesLoading(false)
      }
    }

    loadStates()
  }, [filters.country])

  // Load cities when state changes
  useEffect(() => {
    const loadCities = async () => {
      if (!filters.country || !filters.state_province) {
        setCities([])
        return
      }

      setIsCitiesLoading(true)
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            country: filters.country,
            state: filters.state_province,
          }),
        })
        const { data } = await response.json()
        if (data) {
          setCities([...data.map((city) => ({ name: city, value: city })), { name: "Other", value: "Other" }])
        }
      } catch (error) {
        console.error("Error loading cities:", error)
        setCities([])
      } finally {
        setIsCitiesLoading(false)
      }
    }

    loadCities()
  }, [filters.country, filters.state_province])

  const resetFilters = useCallback(() => {
    setFilters({
      age: "0-100",
      gender: "",
      monthDuration: "",
      country: "",
      state_province: "",
      city: "",
    })
  }, [])

  const countryOptions = useMemo(
    () => [{ name: "All Countries", value: "" }, ...countries.map((item) => ({ name: item.name, value: item.name }))],
    [countries],
  )

  const timePeriods = generateChartDurationArray(liveStartedAt, liveEndedAt)
    console.log(timePeriods)

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="w-full md:w-1/5 space-y-3">
        <Button className="rounded-lg w-full" variant="primary-outline" onClick={resetFilters}>
          Reset all filters
        </Button>
        <hr className="my-3" />
        <p>Age: {filters.age}</p>
        <div className="mx-2 pb-3">
          <Slider range min={0} max={100} value={filters.age.split("-").map(Number)} onChange={handleAgeChange} />
        </div>
        <DropdownInput
          placeholder="Gender"
          value={filters.gender}
          onChange={(e) => handleInputChange("gender", e.value)}
          options={[
            { name: "All", value: "" },
            { name: "Male", value: "male" },
            { name: "Female", value: "female" },
            { name: "Other", value: "other" },
          ]}
        />
        <hr className="my-3" />
        <p className="font-medium">Location</p>
        <DropdownInput
          filter
          placeholder="Country"
          name="country"
          value={filters.country}
          onChange={(e) => handleInputChange("country", e.value)}
          options={countryOptions}
        />
        <DropdownInput
          filter
          placeholder="State/Province"
          name="state_province"
          value={filters.state_province}
          onChange={(e) => handleInputChange("state_province", e.value)}
          options={[{ name: "All States", value: "" }, ...states]}
          disabled={!filters.country}
          loading={isStatesLoading}
        />
        <DropdownInput
          filter
          placeholder="City"
          name="city"
          value={filters.city}
          onChange={(e) => handleInputChange("city", e.value)}
          options={[{ name: "All Cities", value: "" }, ...cities]}
          disabled={!filters.state_province}
          loading={isCitiesLoading}
        />
        <hr className="my-3" />
        <p className="font-medium">Time Period</p>
        <div className="flex gap-2 flex-wrap">
          {timePeriods.map(({ duration, label }) => (
            <button
              key={duration}
              className={`border px-2 ${
                filters.monthDuration === duration ? "text-primary border-primary" : "text-[#6B7280]"
              } rounded-md`}
              onClick={() => handleInputChange("monthDuration", duration)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Apply Filters Button */}
        <Button className="rounded-lg w-full mt-5" variant="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
      <div className="w-full md:w-4/5 bg-[#F9FAFB] rounded-xl p-2 md:px-5 md:py-7">
        <Chart chartData={chartData} isLoading={loadingGraphId === chartData._id} />
      </div>
    </div>
  )
}

export default SurveyReportChart

