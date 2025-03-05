import React from "react";
import { Card, Typography, Space, Tag } from "antd";
import { MailOutlined, PaperClipOutlined, CheckOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const EmailBubble = ({ message }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "read":
        return "success";
      case "delivered":
        return "processing";
      case "sent":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Card
      style={{
        width: "100%",
        marginBottom: "16px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <Space>
          <MailOutlined style={{ color: "#2563EB" }} />
          <Title level={5} style={{ margin: 0 }}>{message.subject}</Title>
        </Space>
        <Text type="secondary" style={{ fontSize: "12px" }}>{message.time}</Text>
      </div>

      <div style={{ marginBottom: "12px" }}>
        {message.htmlContent ? (
          <div dangerouslySetInnerHTML={{ __html: message.htmlContent }} />
        ) : (
          <Text>{message.content}</Text>
        )}
      </div>

      {message.attachments && message.attachments.length > 0 && (
        <div style={{ marginBottom: "8px" }}>
          <Space>
            <PaperClipOutlined />
            <Text type="secondary">Attachments:</Text>
            {message.attachments.map((file, index) => (
              <Tag key={index} color="blue">
                {file.name}
              </Tag>
            ))}
          </Space>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <Space>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {message.sender}
          </Text>
          <CheckOutlined style={{ color: getStatusColor(message.status) }} />
        </Space>
      </div>
    </Card>
  );
};

export default EmailBubble; 