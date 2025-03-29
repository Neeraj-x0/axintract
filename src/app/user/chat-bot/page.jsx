"use client";
import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Typography, Spin } from "antd";
import useAxios from "@/lib";
import AnalyticsComponent from "./AnalyticsComponent";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const ChatBotSection = () => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageData, setMessageData] = useState({
    total: 0,
    today: 0,
    weekly: 0,
    monthly: 0,
    chartData: [],
  });

  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real application, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock message data
        setMessageData({
          total: 24763,
          today: 342,
          weekly: 1845,
          monthly: 7256,
          chartData: [
            { date: "2025-03-21", messages: 243 },
            { date: "2025-03-22", messages: 321 },
            { date: "2025-03-23", messages: 267 },
            { date: "2025-03-24", messages: 345 },
            { date: "2025-03-25", messages: 290 },
            { date: "2025-03-26", messages: 237 },
            { date: "2025-03-27", messages: 342 },
          ],
        });

        const fileData = await axios.get("/api/user/files", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setFileList(fileData.response.data);

        setLoading(false);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #e8e8e8",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            Chatbot Analytics Dashboard
          </Title>
          <Text type="secondary">
            Welcome, Neeraj-x0 |{" "}
            {new Date().toISOString().slice(0, 19).replace("T", " ")}
          </Text>
        </div>
      </Header>
      <Content style={{ padding: "24px", background: "#f5f5f5" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <Spin size="large" tip="Loading dashboard..." />
          </div>
        ) : (
          <>
            {/* Analytics Component */}
            <AnalyticsComponent loading={loading} messageData={messageData}  fileList={fileList} setFileList={setFileList}/>

            <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>

              {/* Right side: File explorer */}
              <Col xs={24} lg={10}>
              
              </Col>
            </Row>
          </>
        )}
      </Content>
    </Layout>
  );
};

export default ChatBotSection;
