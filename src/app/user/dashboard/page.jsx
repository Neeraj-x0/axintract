"use client";
import React from "react";
import StatCard from "./components/StatCard";
import LineChart from "./components/LineChart";
import Guage from "./components/Guage";
import Header from "./components/Header";
import { Comfortaa } from "next/font/google";
import Link from "next/link";
import TeamPerformanceChart from "./components/StatisticChart";
import BarChart from "./components/BarChart";
export const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
});
function DashboardPage() {
  const stats = [
    {
      label: "Leads",
      value: 128,
      maxValue: 200,
      color: "#4CC3E1",
      icon: "down-arrow",
    },
    {
      label: "Engagements",
      value: 128,
      maxValue: 200,
      color: "#4CC3E1",
      icon: "down-arrow",
    },
    {
      label: "Converted Leads",
      value: 128,
      maxValue: 200,
      color: "#4CC3E1",
      icon: "down-arrow",
    },
    {
      label: "Inactive Leads",
      value: 128,
      maxValue: 200,
      color: "#4CC3E1",
      icon: "down-arrow",
    },
    {
      label: "Conversion",
      value: 128,
      maxValue: 200,
      color: "#4CC3E1",
      icon: "down-arrow",
    },
  ];

  return (
    <div
      className={`h-full gap-2 flex text-neutral-700 flex-col overflow-hidden p-8 bg-transparent ${comfortaa.className}`}
    >
      <Header />
      {/* Body */}
      <div className={`flex justify-between items-center  w-full`}>
        <span className="font-extrabold text-2xl">Overview</span>
        <Link href="/user/leads" className="align-middle">
          <button className="bg-gradient-to-r from-blue-400 to-blue-700 text-white px-4 py-2 rounded-xl">
            Manage Leads
          </button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 w-full gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="flex h-full justify-between gap-2 overflow-hidden items-start w-full">
        <LineChart />
        <Guage />
      </div>
      <div className="flex h-full justify-between gap-2 overflow-hidden items-start w-full">
        <TeamPerformanceChart />
        <BarChart />{" "}
      </div>
    </div>
  );
}

export default DashboardPage;
