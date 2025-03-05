"use client";
import React, { useState } from "react";
import { Layout } from "antd";
import ActionSidebar from "../components/ActionSidebar";

const { Content } = Layout;

export default function EngagementLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ background: "#ffffff", height: "100%" }}>
      <ActionSidebar
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      />
      <Content
        style={{
          height: "100vh",
          margin: "0 24px",
          overflow: "auto",
          padding: "12px",
          marginLeft: collapsed ? "80px" : "280px",
          transition: "all 0.2s",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
}
