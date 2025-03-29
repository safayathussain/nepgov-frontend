"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import Loading from "@/components/common/Loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const Chart = React.forwardRef(({ chartData, isLoading }, ref) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        mode: "index",
        intersect: false,
        position: "nearest",
        callbacks: {
          title: (context) => context[0].label,
          label: (context) => `${context.dataset.label}: ${context.parsed.y}%`,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 6,
      },
      line: {
        borderWidth: 2,
      },
    },
  };

  const hoverLinePlugin = {
    id: "hoverLine",
    beforeDraw: (chart) => {
      if (chart.tooltip?.getActiveElements()?.length) {
        const activePoint = chart.tooltip.getActiveElements()[0];
        const ctx = chart.ctx;
        const x = activePoint.element.x;
        const topY = chart.scales.y.top;
        const bottomY = chart.scales.y.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!chartData && !isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        No data available
      </div>
    );
  }

  return (
    <div className="h-[400px] relative" ref={ref}>
      <Line
      
        options={options}
        data={{
          labels: chartData?.labels || [],
          datasets: chartData?.datasets || [],
        }}
        plugins={[hoverLinePlugin]}
      />
    </div>
  );
});

export default Chart;
