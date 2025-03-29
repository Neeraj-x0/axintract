"use client";
import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Graph = () => {
  const [selectedYear, setSelectedYear] = useState("2014");
  const [selectedFilter, setSelectedFilter] = useState("Salary Statistics");

  // Sample data inspired by the image
  const salaryData = [
    { year: "2010", marketing: 45, design: 70, development: 38 },
    { year: "2011", marketing: 34, design: 48, development: 25 },
    { year: "2012", marketing: 56, design: 65, development: 42 },
    { year: "2013", marketing: 47, design: 52, development: 60 },
    { year: "2014", marketing: 80, design: 55, development: 48 }, // Peak year for marketing
    { year: "2015", marketing: 55, design: 72, development: 50 },
    { year: "2016", marketing: 60, design: 58, development: 65 },
    { year: "2017", marketing: 50, design: 68, development: 55 },
  ];

  // Get statistics for the selected year
  const getYearStats = (year) => {
    const yearData = salaryData.find((item) => item.year === year);
    return {
      marketing: yearData?.marketing || 0,
      design: yearData?.design || 0,
      development: yearData?.development || 0,
    };
  };

  const yearStats = getYearStats(selectedYear);

  // Detect mobile view
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;

  // Define chart configuration for Highcharts
  const chartOptions = {
    chart: {
      type: "areaspline",
      height: 280, // Reduced from 400 to 280
      style: {
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      },
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderRadius: 16,
      spacing: [15, 20, 15, 20], // Reduced top and bottom spacing
    },
    title: {
      text: null, // No title needed
    },
    xAxis: {
      categories: salaryData.map((item) => item.year),
      labels: {
        style: {
          fontSize: "12px",
          color: "#666",
        },
      },
      lineColor: "#e0e0e0",
      tickColor: "#e0e0e0",
      tickLength: 5,
    },
    yAxis: {
      title: {
        text: null, // No y-axis title
      },
      labels: {
        style: {
          fontSize: "12px",
          color: "#666",
        },
        formatter: function () {
          return this.value;
        },
      },
      gridLineColor: "rgba(230, 230, 230, 0.5)",
      gridLineDashStyle: "Dash",
      min: 0,
      max: 100,
      tickInterval: 25,
    },
    legend: {
      enabled: false, // No legend needed as per image
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderWidth: 0,
      borderRadius: 8,
      shadow: true,
      padding: 12,
      style: {
        fontSize: "12px",
      },
      formatter: function () {
        return `<div style="font-weight: bold">${this.x}</div>
                <div><span style="color: #FF8C00">Marketing: ${this.point.y}</span></div>`;
      },
      positioner: function (width, height, point) {
        return { x: point.plotX + 10, y: point.plotY - 40 }; // Adjusted tooltip position
      },
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.2,
        lineWidth: 3,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 4,
          states: {
            hover: {
              enabled: true,
              radius: 6,
            },
          },
        },
        states: {
          hover: {
            lineWidth: 4,
            halo: {
              size: 10,
              opacity: 0.25,
            },
          },
        },
        
        shadow: {
          color: "rgba(0,0,0,0.15)",
          offsetX: 0,
          offsetY: 3,
          width: 6,
        },
      },
      series: {
        animation: {
          duration: 1500,
        },
        point: {
          events: {
            mouseOver: function () {
              if (this.series.index === 0 && this.category === "2014") {
                this.update({
                  marker: {
                    enabled: true,
                    radius: 6,
                    fillColor: "#FF8C00",
                    lineWidth: 2,
                    lineColor: "#FFFFFF",
                  },
                });
              }
            },
          },
        },
      },
    },
    series: [
      {
        name: "Marketing",
        data: salaryData.map((item) => item.marketing),
        color: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "#FF8C00"],
            [1, "rgba(255, 140, 0, 0.1)"],
          ],
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(255, 140, 0, 0.2)"],
            [1, "rgba(255, 255, 255, 0)"],
          ],
        },
      },
      {
        name: "Design",
        data: salaryData.map((item) => item.design),
        color: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "#36648B"],
            [1, "rgba(54, 100, 139, 0.1)"],
          ],
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(54, 100, 139, 0.2)"],
            [1, "rgba(255, 255, 255, 0)"],
          ],
        },
      },
      {
        name: "Development",
        data: salaryData.map((item) => item.development),
        color: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "#D3D3D3"],
            [1, "rgba(211, 211, 211, 0.1)"],
          ],
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(211, 211, 211, 0.2)"],
            [1, "rgba(255, 255, 255, 0)"],
          ],
        },
      },
    ],
    credits: {
      enabled: false
    },
    // Add more compact margins to optimize space usage
    margin: [35, 10, 30, 40]
  };

  // Initialize with highlighted marker for 2014 Marketing data point
  useEffect(() => {
    const chart = chartRef.current?.chart;
    if (chart) {
      // Find the point corresponding to 2014 marketing
      const point = chart.series[0].points.find((p) => p.category === "2014");
      if (point) {
        point.update({
          marker: {
            enabled: true,
            radius: 6,
            fillColor: "#FF8C00",
            lineWidth: 2,
            lineColor: "#FFFFFF",
          },
        });
      }
    }
  }, []);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      const chart = chartRef.current?.chart;
      if (chart) {
        chart.reflow();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reference to access chart instance later
  const chartRef = useRef(null);

  return (
    <div className="flex flex-col w-[70%]">
      <div
        className="w-full rounded-2xl"
        style={{ height: "300px" }} // Reduced from 400px to 300px
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={chartRef}
        />
      </div>
    </div>
  );
};

export default Graph;