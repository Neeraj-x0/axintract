"use client";
import React from "react";
import { useState, useEffect } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

const StatsCard = ({
  value = 128,
  label = "Events",
  maxValue = 200,
  color = "#4CC3E1",
  icon = "down-arrow",
  animationDuration = 1500,
}) => {
  // State for animated progress
  const [animatedValue, setAnimatedValue] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Calculate the progress percentage (0-100)
  const progressPercentage = (value / maxValue) * 100;

  // Configure SVG parameters for the circular progress
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (animatedProgress / 100) * circumference;

  // Animation effect
  useEffect(() => {
    // Reset animation when value changes
    setAnimatedValue(0);
    setAnimatedProgress(0);

    // Animate the value counting up
    const valueTimer = setTimeout(() => {
      const duration = animationDuration;
      const startTime = Date.now();

      const animateValue = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setAnimatedValue(Math.floor(progress * value));
        setAnimatedProgress(progress * progressPercentage);

        if (progress < 1) {
          requestAnimationFrame(animateValue);
        }
      };

      requestAnimationFrame(animateValue);
    }, 200); // Small delay before starting animation

    return () => clearTimeout(valueTimer);
  }, [value, progressPercentage, animationDuration]);

  // Icons mapping
  const icons = {
    "down-arrow": <ArrowDownLeft />,
    "up-arrow": <ArrowUpRight />,
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center transition-all duration-300 hover:shadow-md">
      <div className="relative h-16 w-16 mr-4">
        {/* Background circle */}
          <svg className="w-full h-full"  viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#EDF2F7"
              strokeWidth="8"
              className="transition-all duration-300 " 
            />

            {/* Progress arc */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 50 50)"
              className="transition-all duration-300 "
              style={{
                filter: "drop-shadow(0px 50px 50px rgba(76, 195, 225, 0.3))",
              }}
            />

            {/* Icon in center */}
            <foreignObject x="30" y="30" width="40" height="40">
              <div className="flex items-center justify-center w-full h-full">
                {icons[icon]}
              </div>
            </foreignObject>
          </svg>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-gray-800 transition-all duration-300">
          {animatedValue}
        </h3>
        <p className="text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;
