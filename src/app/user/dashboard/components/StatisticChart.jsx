import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";

const TeamPerformanceChart = () => {
  const chartRef = useRef(null);

  // Colors from the image
  const colors = {
    developer: "#f5923e",
    design: "#3e97f5",
    marketing: "#3ec9f5",
    management: "#9c3ef5",
  };

  // Dummy data matching the image
  const data = [
    { name: "Developer Team", value: 65, color: colors.developer },
    { name: "Design Team", value: 84, color: colors.design },
    { name: "Marketing Team", value: 28, color: colors.marketing },
    { name: "Management Team", value: 16, color: colors.management },
  ];

  useEffect(() => {
    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: {
          type: "bar",
          height: 250,
          backgroundColor: "transparent",
          style: {
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          },
        },
        title: {
          text: "Performance Statistics",
          align: "left",
          style: {
            fontWeight: "bold",
            fontSize: "16px",
            color: "#333",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          },
        },
        xAxis: {
          categories: data.map((item) => item.name),
          labels: {
            style: {
              color: "#333",
              fontSize: "12px",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            },
          },
          lineWidth: 0,
          tickWidth: 0,
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: null,
          },
          labels: {
            enabled: false,
          },
          gridLineWidth: 0,
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          formatter: function () {
            return `<b>${this.x}</b>: ${this.y}%`;
          },
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          borderRadius: 8,
          style: {
            color: "#fff",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            dataLabels: {
              enabled: true,
              format: "{y}%",
              align: "right",
              style: {
                fontWeight: "normal",
                color: "#333",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              },
            },
          },
          series: {
            pointWidth: 12,
            animation: {
              duration: 1000,
              easing: "easeOutBounce",
            },
          },
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            data: data.map((item) => ({
              y: item.value,
              color: item.color,
              name: item.name,
            })),
          },
        ],
      });
    }
  }, []);

  return (
    <div className="w-[28%]  p-4 bg-white rounded-2xl shadow-lg">
      <div ref={chartRef} className="w-full"></div>
    </div>
  );
};

export default TeamPerformanceChart;
