"use client";
import React, { useRef, useEffect, useState } from "react";
import Highcharts from "highcharts/es-modules/masters/highcharts.src.js";
import HighchartsReact from "highcharts-react-official";
import { ThumbsUp } from "lucide-react";
import "highcharts/es-modules/masters/highcharts-more.src.js";
import "highcharts/es-modules/masters/modules/solid-gauge.src.js";

const Guage = () => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const satisfactionValue = 74;
  const [chartHeight, setChartHeight] = useState(200);

  // Dynamically adjust chart height to parent container
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        // Get container height and subtract padding and header height
        const containerHeight = containerRef.current.clientHeight;
        const headerHeight = 40; // Approximate height of the header
        const padding = 32; // Total vertical padding (16px top + 16px bottom)
        const newHeight = Math.max(
          containerHeight - headerHeight - padding,
          150
        ); // Minimum height of 150px
        setChartHeight(newHeight);
      }
    };

    updateDimensions(); // Initial sizing

    // Re-calculate when window is resized
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Update chart when height changes
  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.update({
        chart: {
          height: chartHeight,
        },
      });
    }
  }, [chartHeight]);

  const options = {
    chart: {
      type: "solidgauge",
      height: chartHeight,
      backgroundColor: "transparent",
      margin: [0, 0, 0, 0],
      spacing: [0, 0, 0, 0],
    },
    title: null,
    pane: {
      center: ["50%", "55%"],
      size: "110%",
      startAngle: -90,
      endAngle: 90,
      background: [
        {
          backgroundColor: "#f5f5f5",
          innerRadius: "90%",
          outerRadius: "100%",
          shape: "arc",
          borderWidth: 0,
          className: "gauge-background",
        },
      ],
    },
    tooltip: {
      enabled: false,
    },
    yAxis: {
      min: 0,
      max: 100,
      stops: [
        [0.1, "#ffab40"], // vibrant red
        [0.5, "#ffab40"], // vibrant amber
        [0.9, "#ffab40"], // vibrant green
      ],
      lineWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      labels: {
        enabled: false,
      },
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: false,
        },
        linecap: "round",
        rounded: true,
        borderWidth: 0,
        radius: "100%",
        innerRadius: "90%",
        animation: {
          duration: 1500,
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Satisfaction",
        data: [satisfactionValue],
        innerRadius: "90%",
        radius: "100%",
        colorByPoint: false,
      },
    ],
  };

  // Get color based on satisfaction value - more vibrant colors
  const getColor = () => {
    if (satisfactionValue >= 70) return "#00c853"; // Vibrant green
    if (satisfactionValue >= 40) return "#ffab00"; // Vibrant amber
    return "#ff1744"; // Vibrant red
  };

  return (
    <div
      ref={containerRef}
      className="flex w-[28%] flex-col items-center border-b-blue-200 px-2 h-full justify-center rounded-2xl bg-gradient-to-br from-white to-gray-50"
      style={{ minHeight: "250px" }}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-1 pt-6 flex items-center">
        <span className="mr-2">Employee Satisfaction</span>
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: getColor() }}
        ></div>
      </h3>

      <div className="text-sm text-gray-500 mb-2">Team happiness index</div>

      <div className="relative w-full flex-grow">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartRef}
          containerProps={{ style: { height: "90%", width: "100%" } }}
        />
        <div className="absolute top-[48%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <span
            className="text-3xl font-bold"
            style={{
              color: getColor(),
              textShadow: "0 0 5px rgba(255,255,255,0.8)",
            }}
          >
            {satisfactionValue}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Guage;
