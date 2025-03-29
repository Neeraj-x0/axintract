import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';

const EmployeeBarChart = () => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: {
          type: 'column',
          backgroundColor: '#ffffff',
          height: 350
        },
        title: {
          text: null
        },
        xAxis: {
          categories: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
          lineColor: 'transparent',
          labels: {
            style: {
              color: '#9ca3af',
              fontSize: '12px'
            }
          },
          tickLength: 0
        },
        yAxis: {
          title: {
            text: null
          },
          labels: {
            style: {
              color: '#9ca3af',
              fontSize: '12px'
            },
            formatter: function() {
              if (this.value === 0 || this.value === 25 || 
                  this.value === 50 || this.value === 75 || 
                  this.value === 100) {
                return this.value;
              } else {
                return '';
              }
            }
          },
          min: 0,
          max: 100,
          tickInterval: 25,
          gridLineColor: '#e5e7eb',
          gridLineDashStyle: 'Dash'
        },
        legend: {
          enabled: false
        },
        tooltip: {
          shared: true,
          backgroundColor: 'white',
          borderWidth: 0,
          borderRadius: 8,
          shadow: true,
          useHTML: true,
          formatter: function() {
            return `<div style="padding: 8px;">
              <strong>${this.x}</strong><br/>
              Male: ${Math.round(Math.random() * 150 + 100)}<br/>
              Female: ${Math.round(Math.random() * 100 + 80)}
            </div>`;
          }
        },
        plotOptions: {
          column: {
            borderRadius: 4,
            pointPadding: 0.1,
            groupPadding: 0.05
          },
          series: {
            states: {
              hover: {
                brightness: 0.1
              }
            }
          }
        },
        series: [
          {
            name: 'Highlighted',
            data: [null, 65, null, 70, null, 65, null, null].map(val => ({
              y: val,
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, '#ff7e33'],
                  [1, '#ffdbc5']
                ]
              }
            })),
            pointWidth: 16,
            zIndex: 3
          },
          {
            name: 'Secondary Highlighted',
            data: [60, null, 55, null, 75, null, 40, 65].map(val => ({
              y: val,
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, '#ffdbc5'],
                  [1, '#fff5ef']
                ]
              }
            })),
            pointWidth: 16,
            zIndex: 2
          },
          {
            name: 'Regular',
            data: [75, 85, 75, 85, 92, 70, 85, 75].map(val => ({
              y: val,
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, '#9ca3af'],
                  [1, '#e5e7eb']
                ]
              }
            })),
            pointWidth: 16,
            zIndex: 1
          },
          {
            name: 'Trend',
            type: 'spline',
            data: [65, 70, 60, 72, 80, 65, 60, 68],
            lineWidth: 2,
            lineColor: '#b3b8c2',
            dashStyle: 'Dash',
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 4
            },
            zIndex: 4
          },
          {
            name: 'Highlight Point',
            type: 'scatter',
            data: [null, null, null, null, 80, null, null, null],
            marker: {
              enabled: true,
              symbol: 'circle',
              radius: 8,
              fillColor: '#ff7e33',
              lineWidth: 3,
              lineColor: 'white'
            },
            zIndex: 5
          }
        ],
        credits: {
          enabled: false
        }
      });
    }
  }, []);

  return (
    <div className="relative w-[70%] p-2 rounded-2xl bg-white">
      <div ref={chartRef} className="w-full h-64"></div>
    </div>
  );
};

export default EmployeeBarChart;