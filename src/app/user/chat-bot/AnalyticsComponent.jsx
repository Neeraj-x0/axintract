"use client";
import React from "react";
import { Card, Statistic, Row, Col, Typography, Spin } from "antd";
import {
  MessageOutlined,
  CalendarOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Line } from "@ant-design/charts";
import FileExplorerComponent from "./FileExplorer";

const { Title } = Typography;

const AnalyticsComponent = ({ loading, messageData ,fileList,setFileList}) => {
  const config = {
    data: messageData.chartData,
    xField: "date",
    yField: "messages",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
    smooth: true,
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Spin size="large" tip="Loading analytics data..." />
      </div>
    );
  }

  return (
    <>
      <Title level={4} style={{ marginBottom: "20px" }}>
        <LineChartOutlined /> Message Statistics
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: "4px" }}>
            <Statistic
              title="Total Messages"
              value={messageData.total}
              prefix={<MessageOutlined />}
              valueStyle={{ color: "#000000" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: "4px" }}>
            <Statistic
              title="Messages Today"
              value={messageData.today}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: "#000000" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: "4px" }}>
            <Statistic
              title="Messages This Week"
              value={messageData.weekly}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: "#000000" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ borderRadius: "4px" }}>
            <Statistic
              title="Messages This Month"
              value={messageData.monthly}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: "#000000" }}
            />
          </Card>
        </Col>
      </Row>

      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "4px",
          marginTop: "24px",
          flex: 1,
            display: "flex",

        }}
      >
        <Title level={5}>Message Trend (Last 7 Days)</Title>
        <Line
          {...config}
          color="#000000"
          theme="light"
          style={{ height: 350 }}
        />
      </div>
       <FileExplorerComponent
                  loading={loading}
                  fileList={fileList}
                  setFileList={setFileList}
                />
      
    </>
  );
};

export default AnalyticsComponent;
