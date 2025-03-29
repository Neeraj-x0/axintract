"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Components/Dashboard";
import Whatsapp from "./Components/Whatsapp";
import Email from "./Components/Email";
export default function EngagementPage() {
  const { activeKey } = useSelector((state) => state.sidebar);
  useEffect(() => {
    console.log(activeKey);
  }, [activeKey]);

  return (
    <div style={{ height: "100%", overflow : "hidden" ,paddingTop:"60px",}}>
      {activeKey === "dashboard" && <Dashboard />}
      {activeKey === "whatsapp" && <Whatsapp />}
      {activeKey === "email" && <Email />}
    </div>
  );
}
