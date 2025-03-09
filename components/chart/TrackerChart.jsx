"use client"
import { useEffect, useRef, useState, useCallback } from "react"
import Chart from "chart.js/auto"

const TrackerChart = ({ data, height = 200 }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const [sortedData, setSortedData] = useState([])

  const formatMonthYear = useCallback((dateString) => {
    const [year, month] = dateString.split("-")
    const date = new Date(year, month - 1)
    return date.toLocaleString("default", { month: "long", year: "numeric" })
  }, [])

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")

      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const monthYearVotes = data?.monthYearVotes||{}
      const sortedMonths = Object.keys(monthYearVotes)?.sort()
      const formattedMonths = sortedMonths?.map(formatMonthYear)
      const datasets = data?.options?.map((option) => ({
        label: option.content,
        data: sortedMonths.map((month) => {
          const totalVotes = monthYearVotes[month].total
          const optionVotes = monthYearVotes[month].options[option._id]?.votes || 0
          return totalVotes > 0 ? (optionVotes / totalVotes) * 100 : 0
        }),
        borderColor: option.color,
        pointBackgroundColor: "white",
      }))

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: formattedMonths,
          datasets: datasets,
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              displayColors: false,
              mode: "index",
              enabled: true,
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(1)}%`,
              },
            },
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
              min: -5,
              max: 105,
              beginAtZero: true,
            },
          },
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1.5,
        },
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, formatMonthYear])

  useEffect(() => {
    const latestMonth = Object.keys(data?.monthYearVotes||{})?.sort().pop()
    const latestData = data?.monthYearVotes[latestMonth]
    const totalVotes = latestData?.total || 0

    const latestValues = data?.options?.map((option) => {
      const votes = latestData?.options[option._id]?.votes || 0
      const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0
      return { value: percentage, color: option.color }
    })

    latestValues?.sort((a, b) => b.value - a.value)
    setSortedData(latestValues)
  }, [data])

  return (
    <div className="w-full max-w-2xl mx-auto flex items-center gap-5 mt-2">
      <div className="relative" style={{ width: `85%`,  }}>
        <canvas ref={chartRef}></canvas>
      </div>
      <div>
        {sortedData?.map((item, index) => (
          <p key={index} style={{ color: item.color }} className="font-bold my-2">
            {item.value.toFixed(0)}%
          </p>
        ))}
      </div>
    </div>
  )
}

export default TrackerChart

